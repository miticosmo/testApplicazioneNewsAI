import React from 'react';
import { Translation, AppState } from '../types';
import { Zap, RefreshCw, AlertCircle } from 'lucide-react';

interface HeroProps {
  t: Translation;
  status: AppState;
  onSync: () => void;
  lastUpdated: Date | null;
}

const Hero: React.FC<HeroProps> = ({ t, status, onSync, lastUpdated }) => {
  const isLoading = status === 'LOADING';
  const isError = status === 'ERROR';

  return (
    <section className="px-4 md:px-8 pt-6 pb-12 max-w-7xl mx-auto w-full">
      <div className="flex flex-col gap-10">
        {/* Massive H1 at the top */}
        <div className="relative">
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-crextio-dark tracking-tighter leading-[0.9] -ml-1">
            {t.heroHeadline}
          </h1>
          {/* Subtle underline decoration */}
          <div className="h-2 w-32 bg-crextio-yellow mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
          <p className="text-xl md:text-2xl text-stone-600 leading-relaxed max-w-2xl font-normal">
            {t.heroSubheadline}
          </p>

          <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
             {lastUpdated && status === 'LOADED' && (
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-stone-100/50 shadow-sm">
                {t.lastUpdated} — {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            
            <button
              onClick={onSync}
              disabled={isLoading}
              className={`
                relative group flex items-center justify-center gap-3 px-8 py-5 rounded-full text-lg font-bold transition-all duration-300 w-full sm:w-auto
                ${isLoading 
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                  : 'bg-crextio-dark text-white hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] active:scale-[0.98]'
                }
              `}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{t.syncingButton}</span>
                </>
              ) : (
                <>
                  <Zap className={`w-5 h-5 ${isError ? 'text-red-400' : 'text-crextio-yellow'} group-hover:animate-pulse`} fill="currentColor" />
                  <span>{t.syncButton}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;