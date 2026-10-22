// src/components/restaurant/FilterPanel.jsx
import React from 'react';
import { SlidersHorizontal, MapPin, Utensils, Star, RotateCcw } from 'lucide-react';
import Button from '../common/Button';

export const FilterPanel = ({
  locations,
  cuisines,
  selectedLocation,
  onSelectLocation,
  selectedCuisine,
  onSelectCuisine,
  minRating,
  onSelectMinRating,
  onReset,
  totalResults
}) => {
  return (
    <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] p-6 shadow-cozy mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-[#E5DFD2]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#E8ECE4] text-[#879779] flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#393A32]">Filter Dining Spaces</h3>
            <p className="text-xs text-[#77786C]">
              Showing <span className="font-semibold text-[#393A32]">{totalResults}</span> welcoming places
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          icon={RotateCcw}
          onClick={onReset}
          className="text-xs self-start lg:self-auto text-[#77786C] hover:text-[#393A32]"
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
        {/* Location Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#879779]" />
            <span>Location</span>
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => onSelectLocation(e.target.value)}
            className="w-full bg-[#F7F4EC] border border-[#E5DFD2] rounded-xl px-3.5 py-2.5 text-sm text-[#393A32] focus:outline-none focus:ring-2 focus:ring-[#879779]/20 focus:border-[#879779]"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc === 'All' ? 'All Locations' : loc}
              </option>
            ))}
          </select>
        </div>

        {/* Cuisine Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55] flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-[#879779]" />
            <span>Cuisine</span>
          </label>
          <select
            value={selectedCuisine}
            onChange={(e) => onSelectCuisine(e.target.value)}
            className="w-full bg-[#F7F4EC] border border-[#E5DFD2] rounded-xl px-3.5 py-2.5 text-sm text-[#393A32] focus:outline-none focus:ring-2 focus:ring-[#879779]/20 focus:border-[#879779]"
          >
            {cuisines.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Cuisines' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Min Rating Filter */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55] flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#879779]" />
            <span>Minimum Rating</span>
          </label>
          <select
            value={minRating}
            onChange={(e) => onSelectMinRating(Number(e.target.value))}
            className="w-full bg-[#F7F4EC] border border-[#E5DFD2] rounded-xl px-3.5 py-2.5 text-sm text-[#393A32] focus:outline-none focus:ring-2 focus:ring-[#879779]/20 focus:border-[#879779]"
          >
            <option value={0}>Any Rating</option>
            <option value={4.5}>4.5+ Stars & Welcoming</option>
            <option value={4.7}>4.7+ Stars (Beloved)</option>
            <option value={4.9}>4.9+ Stars (Exceptional)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
