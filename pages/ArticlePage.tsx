import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsItem, Translation } from '../types';
import { CATEGORY_GRADIENTS, CATEGORY_ICONS } from '../constants';
import { ArrowLeft, ExternalLink, Share2, Heart, Clock } from 'lucide-react';

interface ArticlePageProps {
  news: NewsItem[];
  t: Translation;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (id: string) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ news, t, isBookmarked, onToggleBookmark }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);

  const article = useMemo(() => news.find(n => n.id === id), [news, id]);

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-stone-400 dark:text-gray-500">Article not found.</p>
      </div>
    );
  }

  const hasImage = article.image_url && !imgError;
  const categoryLabel = t.categories[article.category] || t.categories['altro'];
  const bookmarked = isBookmarked(article.id);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-20">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-500 dark:text-gray-400 hover:text-crextio-dark dark:hover:text-gray-200 font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t.backButton}
      </button>

      {/* Hero image */}
      <div className="relative w-full h-64 md:h-96 rounded-[2rem] overflow-hidden mb-8">
        {hasImage ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${CATEGORY_GRADIENTS[article.category] || CATEGORY_GRADIENTS['industry']}`}>
            <span className="text-7xl mb-3">{CATEGORY_ICONS[article.category] || '📡'}</span>
            <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">{categoryLabel}</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase bg-white/90 backdrop-blur-md text-crextio-dark shadow-sm">
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 text-sm text-stone-400 dark:text-gray-500 mb-4">
        <Clock className="w-4 h-4" />
        <span>{formatDate(article.published_at)}</span>
        <span className="mx-1">·</span>
        <span className="font-semibold text-crextio-dark dark:text-gray-300">{article.source_name}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-crextio-dark dark:text-gray-100 tracking-tight leading-tight mb-6">
        {article.title}
      </h1>

      {/* Summary */}
      <p className="text-lg md:text-xl text-stone-600 dark:text-gray-300 leading-relaxed mb-10">
        {article.summary}
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        {article.url && article.url !== '#' && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-crextio-dark dark:bg-gray-100 text-white dark:text-gray-900 font-bold text-sm hover:scale-[1.02] transition-transform"
          >
            <ExternalLink className="w-4 h-4" />
            {t.readOriginal}
          </a>
        )}

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-gray-800 text-crextio-dark dark:text-gray-200 font-bold text-sm border border-stone-200 dark:border-gray-700 hover:border-crextio-dark dark:hover:border-gray-500 transition-all"
        >
          <Share2 className="w-4 h-4" />
          {copied ? t.copiedToClipboard : t.shareButton}
        </button>

        <button
          onClick={() => onToggleBookmark(article.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border transition-all ${
            bookmarked
              ? 'bg-red-50 dark:bg-red-900/30 text-red-500 border-red-200 dark:border-red-800'
              : 'bg-white dark:bg-gray-800 text-stone-500 dark:text-gray-400 border-stone-200 dark:border-gray-700 hover:border-red-300 hover:text-red-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
          {t.navBookmarks}
        </button>
      </div>
    </article>
  );
};

export default ArticlePage;
