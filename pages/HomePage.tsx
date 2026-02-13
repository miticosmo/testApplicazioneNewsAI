import React, { useMemo } from 'react';
import Hero from '../components/Hero';
import NewsFeed from '../components/NewsFeed';
import SearchBar from '../components/SearchBar';
import { NewsItem, Translation, AppState } from '../types';
import { useDebounce } from '../hooks/useDebounce';

interface HomePageProps {
  t: Translation;
  status: AppState;
  onSync: () => void;
  lastUpdated: Date | null;
  news: NewsItem[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  t, status, onSync, lastUpdated, news,
  searchQuery, onSearchChange,
  isBookmarked, onToggleBookmark,
}) => {
  const debouncedQuery = useDebounce(searchQuery, 300);

  const filteredNews = useMemo(() => {
    if (!debouncedQuery.trim()) return news;
    const q = debouncedQuery.toLowerCase();
    return news.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
    );
  }, [news, debouncedQuery]);

  return (
    <>
      <Hero t={t} status={status} onSync={onSync} lastUpdated={lastUpdated} />
      <div className="px-4 md:px-8 max-w-7xl mx-auto w-full mb-6">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={t.searchPlaceholder}
        />
      </div>
      <NewsFeed
        news={filteredNews}
        t={t}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
      />
    </>
  );
};

export default HomePage;
