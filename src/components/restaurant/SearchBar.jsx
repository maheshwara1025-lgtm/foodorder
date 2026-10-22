// src/components/restaurant/SearchBar.jsx
import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

export const SearchBar = ({
  value,
  onChange,
  onClear,
  autoFocus = true,
  placeholder = 'Search by restaurant name, cuisine (French, Italian...), or location...'
}) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [autoFocus]);

  const handleFocusClick = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div
        onClick={handleFocusClick}
        className="group relative flex items-center bg-[#FFFDF7] rounded-2xl shadow-cozy border border-[#E5DFD2] hover:border-[#879779] focus-within:border-[#879779] focus-within:ring-4 focus-within:ring-[#879779]/15 transition-all duration-200"
      >
        <div className="pl-4.5 pr-2 text-[#77786C] group-focus-within:text-[#879779] transition-colors">
          <Search className="w-5 h-5 ml-2" />
        </div>

        <input
          ref={searchInputRef}
          id="restaurant-search-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3.5 pr-12 pl-2 text-sm md:text-base text-[#393A32] placeholder:text-[#979791] bg-transparent focus:outline-none"
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="p-1.5 mr-2 text-[#77786C] hover:text-[#393A32] hover:bg-[#EFECE2] rounded-full transition"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="hidden sm:flex items-center gap-1.5 mr-4 text-[11px] font-semibold text-[#77786C] bg-[#F7F4EC] px-2.5 py-1 rounded-lg border border-[#E5DFD2]">
          <Sparkles className="w-3 h-3 text-[#879779]" />
          <span>Auto-Focus</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
