import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BookmarksPage from './pages/BookmarksPage';
import ArticlePage from './pages/ArticlePage';
import { NewsItem, AppState, Language } from './types';
import { TRANSLATIONS } from './constants';
import { loadNews, refreshNews } from './services/api';
import { useDarkMode } from './hooks/useDarkMode';
import { useBookmarks } from './hooks/useBookmarks';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('IT');
  const [status, setStatus] = useState<AppState>('LOADED');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { isDark, toggle: toggleDark } = useDarkMode();
  const { bookmarkedIds, toggle: toggleBookmark, isBookmarked } = useBookmarks();

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const load = async () => {
      setStatus('LOADING');
      try {
        const cachedNews = await loadNews();
        if (cachedNews.length > 0) {
          setNews(cachedNews);
          setLastUpdated(new Date());
        }
        setStatus('LOADED');
      } catch (error) {
        console.error("Load from Supabase failed:", error);
        setStatus('LOADED');
      }
    };
    load();
  }, []);

  const handleSync = useCallback(async () => {
    setStatus('LOADING');
    try {
      const freshNews = await refreshNews();
      setNews(freshNews);
      setStatus('LOADED');
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Sync failed:", error);
      setStatus('ERROR');
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFBF7] dark:bg-gray-900 text-crextio-dark dark:text-gray-100 font-sans selection:bg-crextio-yellow selection:text-black transition-colors duration-300">

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-yellow-200/30 dark:bg-yellow-900/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-normal animate-pulse"></div>
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-orange-100/40 dark:bg-orange-900/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-yellow-100/50 dark:bg-yellow-900/10 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal"></div>
      </div>

      <div className="relative z-10">
        <Header
          language={language}
          setLanguage={setLanguage}
          isDark={isDark}
          onToggleDark={toggleDark}
          t={t}
        />

        <main className="pb-20">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  t={t}
                  status={status}
                  onSync={handleSync}
                  lastUpdated={lastUpdated}
                  news={news}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
            <Route
              path="/bookmarks"
              element={
                <BookmarksPage
                  news={news}
                  bookmarkedIds={bookmarkedIds}
                  t={t}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
            <Route
              path="/article/:id"
              element={
                <ArticlePage
                  news={news}
                  t={t}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
