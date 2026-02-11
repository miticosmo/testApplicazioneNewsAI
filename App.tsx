import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NewsFeed from './components/NewsFeed';
import { NewsItem, AppState, Language } from './types';
import { TRANSLATIONS, MOCK_NEWS_DATA } from './constants';
import { fetchNews } from './services/api';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('IT');
  const [status, setStatus] = useState<AppState>('LOADED');
  // Initialize with MOCK DATA immediately so it's populated by default
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS_DATA);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(new Date());

  const t = TRANSLATIONS[language];

  const handleSync = useCallback(async () => {
    setStatus('LOADING');
    try {
      const fetchedNews = await fetchNews();
      setNews(fetchedNews);
      setStatus('LOADED');
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Sync failed:", error);
      setStatus('ERROR');
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFBF7] text-crextio-dark font-sans selection:bg-crextio-yellow selection:text-black">
      
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-yellow-200/30 rounded-full blur-[120px] mix-blend-multiply animate-pulse"></div>
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-yellow-100/50 rounded-full blur-[80px] mix-blend-multiply"></div>
      </div>

      <div className="relative z-10">
        <Header language={language} setLanguage={setLanguage} />
        
        <main className="pb-20">
          <Hero 
            t={t} 
            status={status} 
            onSync={handleSync} 
            lastUpdated={lastUpdated} 
          />
          
          <NewsFeed news={news} t={t} />
        </main>
      </div>
    </div>
  );
};

export default App;