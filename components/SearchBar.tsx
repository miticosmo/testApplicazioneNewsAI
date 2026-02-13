import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-gray-500" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/40 dark:border-gray-700/40 text-crextio-dark dark:text-gray-100 placeholder-stone-400 dark:placeholder-gray-500 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-crextio-yellow/50 transition-all duration-300"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-stone-100 dark:bg-gray-700 flex items-center justify-center hover:bg-stone-200 dark:hover:bg-gray-600 transition-colors"
        >
          <X className="w-3 h-3 text-stone-500 dark:text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
