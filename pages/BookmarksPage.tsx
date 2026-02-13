import React from 'react';
import { NewsItem, Translation } from '../types';
import NewsCard from '../components/NewsCard';
import { Heart } from 'lucide-react';

interface BookmarksPageProps {
  news: NewsItem[];
  bookmarkedIds: string[];
  t: Translation;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

const BookmarksPage: React.FC<BookmarksPageProps> = ({
  news, bookmarkedIds, t, isBookmarked, onToggleBookmark,
}) => {
  const bookmarkedNews = news.filter(item => bookmarkedIds.includes(item.id));

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full pt-8 pb-20">
      <h1 className="text-4xl md:text-5xl font-bold text-crextio-dark dark:text-gray-100 tracking-tight mb-10">
        {t.bookmarksTitle}
      </h1>

      {bookmarkedNews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-full shadow-lg shadow-yellow-100 dark:shadow-gray-900 mb-6">
            <Heart className="w-10 h-10 text-stone-300 dark:text-gray-600" />
          </div>
          <p className="text-xl font-medium text-stone-400 dark:text-gray-500 max-w-md">
            {t.bookmarksEmpty}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookmarkedNews.map(item => (
            <NewsCard
              key={item.id}
              item={item}
              t={t}
              categoryLabel={t.categories[item.category] || t.categories['altro']}
              isBookmarked={isBookmarked(item.id)}
              onToggleBookmark={() => onToggleBookmark(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookmarksPage;
