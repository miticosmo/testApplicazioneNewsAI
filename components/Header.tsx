import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  return (
    <header className="sticky top-0 z-50 px-4 md:px-8 pt-6 pb-2 w-full pointer-events-none">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="bg-white/80 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <span className="font-bold text-xl tracking-tight text-crextio-dark">Segnale AI</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-1">
            <button
              onClick={() => setLanguage('IT')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                language === 'IT' 
                  ? 'bg-crextio-dark text-white shadow-lg' 
                  : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100/50'
              }`}
            >
              ITA
            </button>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                language === 'EN' 
                  ? 'bg-crextio-dark text-white shadow-lg' 
                  : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100/50'
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