import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Language, Translation } from '../types';
import { Sun, Moon, Home, Heart } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  isDark: boolean;
  onToggleDark: () => void;
  t: Translation;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, isDark, onToggleDark, t }) => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 px-4 md:px-8 pt-6 pb-2 w-full pointer-events-none">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-3">
          <Link to="/" className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/40 dark:border-gray-700/40 px-5 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <span className="font-bold text-xl tracking-tight text-crextio-dark dark:text-gray-100 cursor-pointer transition-all duration-300 hover:text-crextio-yellow hover:-translate-y-0.5 inline-block">AI Radar <span className="text-crextio-yellow">&#9679;</span> Live</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden sm:flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/40 dark:border-gray-700/40 p-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                location.pathname === '/'
                  ? 'bg-crextio-dark dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg'
                  : 'text-stone-400 dark:text-gray-500 hover:text-stone-600 dark:hover:text-gray-300 hover:bg-stone-100/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              {t.navHome}
            </Link>
            <Link
              to="/bookmarks"
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                location.pathname === '/bookmarks'
                  ? 'bg-crextio-dark dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg'
                  : 'text-stone-400 dark:text-gray-500 hover:text-stone-600 dark:hover:text-gray-300 hover:bg-stone-100/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              {t.navBookmarks}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/40 dark:border-gray-700/40 w-10 h-10 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center text-stone-500 dark:text-gray-400 hover:text-crextio-yellow transition-colors duration-300"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Language switcher */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-1.5 rounded-full border border-white/40 dark:border-gray-700/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-1">
            <button
              onClick={() => setLanguage('IT')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                language === 'IT'
                  ? 'bg-crextio-dark dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg'
                  : 'text-stone-400 dark:text-gray-500 hover:text-stone-600 dark:hover:text-gray-300 hover:bg-stone-100/50 dark:hover:bg-gray-700/50'
              }`}
            >
              ITA
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                language === 'EN'
                  ? 'bg-crextio-dark dark:bg-gray-100 text-white dark:text-gray-900 shadow-lg'
                  : 'text-stone-400 dark:text-gray-500 hover:text-stone-600 dark:hover:text-gray-300 hover:bg-stone-100/50 dark:hover:bg-gray-700/50'
              }`}
            >
              ENG
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
