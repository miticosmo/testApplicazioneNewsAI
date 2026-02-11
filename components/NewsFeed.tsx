import React, { useState, useMemo } from 'react';
import { NewsItem, Translation } from '../types';
import { CATEGORIES } from '../constants';
import NewsCard from './NewsCard';
import { ListFilter } from 'lucide-react';

interface NewsFeedProps {
  news: NewsItem[];
  t: Translation;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ news, t }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredNews = useMemo(() => {
    if (activeCategory === 'all') return news;
    return news.filter(item => item.category === activeCategory);
  }, [news, activeCategory]);

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="bg-white p-6 rounded-full shadow-lg shadow-yellow-100 mb-6">
          <ListFilter className="w-10 h-10 text-stone-300" />
        </div>
        <p className="text-xl font-medium text-stone-400 max-w-md">{t.emptyState}</p>
      </div>
    );
  }

  return (
    <section className="px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Sticky Filters */}
      <div className="sticky top-20 z-40 py-4 -mx-4 md:-mx-8 px-4 md:px-8 mb-8 backdrop-blur-xl bg-[#FDFBF7]/80 border-b border-stone-100/50">
        <div className="flex overflow-x-auto gap-3 no-scrollbar pb-1 max-w-7xl mx-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`
              whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
              ${activeCategory === 'all'
                ? 'bg-crextio-dark text-white border-crextio-dark shadow-lg shadow-stone-200'
                : 'bg-white text-stone-500 border-stone-200 hover:border-crextio-dark hover:text-crextio-dark'
              }
            `}
          >
            {t.categories['all']}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border
                ${activeCategory === cat
                  ? 'bg-crextio-yellow text-crextio-dark border-crextio-yellow shadow-[0_0_20px_rgba(253,224,71,0.4)]'
                  : 'bg-white text-stone-500 border-stone-200 hover:border-crextio-dark hover:text-crextio-dark'
                }
              `}
            >
              {t.categories[cat] || t.categories['altro']}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((item) => (
          <NewsCard 
            key={item.id} 
            item={item} 
            t={t}
            categoryLabel={t.categories[item.category] || t.categories['altro']}
          />
        ))}
      </div>
      
      {filteredNews.length === 0 && (
         <div className="py-20 text-center text-stone-400 font-medium text-lg">
           Nessuna news in questa categoria.
         </div>
      )}
    </section>
  );
};

export default NewsFeed;