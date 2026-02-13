import React, { useState } from 'react';
import { NewsItem, Translation } from '../types';
import { Clock, ArrowUpRight } from 'lucide-react';

interface NewsCardProps {
  item: NewsItem;
  t: Translation;
  categoryLabel: string;
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  'models': 'from-violet-500 to-purple-700',
  'open-source': 'from-emerald-500 to-teal-700',
  'regulation': 'from-red-500 to-rose-700',
  'funding': 'from-amber-500 to-orange-700',
  'research': 'from-blue-500 to-indigo-700',
  'products': 'from-cyan-500 to-sky-700',
  'industry': 'from-stone-500 to-stone-700',
};

const CATEGORY_ICONS: Record<string, string> = {
  'models': '🧠',
  'open-source': '🔓',
  'regulation': '⚖️',
  'funding': '💰',
  'research': '🔬',
  'products': '🚀',
  'industry': '📡',
};

const NewsCard: React.FC<NewsCardProps> = ({ item, t, categoryLabel }) => {
  const [imgError, setImgError] = useState(false);
  const hasImage = item.image_url && !imgError;

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);

    if (diffHrs < 1) return 'Now';
    if (diffHrs < 24) return `${diffHrs}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
  };

  return (
    <article className="group relative bg-white rounded-[2rem] p-4 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-yellow-100/50 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(253,224,71,0.25)]">
      
      {/* Image Container */}
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-[1.5rem] bg-stone-100">
        {hasImage ? (
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${CATEGORY_GRADIENTS[item.category] || CATEGORY_GRADIENTS['industry']} transition-transform duration-700 ease-out group-hover:scale-105`}>
            <span className="text-5xl mb-2">{CATEGORY_ICONS[item.category] || '📡'}</span>
            <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">{categoryLabel}</span>
          </div>
        )}
        {/* Overlay for category */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-white/90 backdrop-blur-md text-crextio-dark shadow-sm">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className="px-3 pb-3 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-400 mb-3">
          <Clock className="w-3.5 h-3.5" />
          {timeAgo(item.published_at)}
        </div>

        <h3 className="text-xl font-bold text-crextio-dark mb-3 leading-tight group-hover:text-black transition-colors">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {item.title}
          </a>
        </h3>

        <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-medium">
          {item.summary}
        </p>

        <div className="flex justify-between items-end mt-auto pt-4 border-t border-stone-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-400">
              {item.source_name.substring(0,1)}
            </div>
            <span className="text-xs font-bold text-crextio-dark">{item.source_name}</span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center text-crextio-dark group-hover:bg-crextio-dark group-hover:text-crextio-yellow transition-all duration-300 group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;