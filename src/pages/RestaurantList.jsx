// src/pages/RestaurantList.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, AlertCircle, Sparkles } from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';
import SearchBar from '../components/restaurant/SearchBar';
import FilterPanel from '../components/restaurant/FilterPanel';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import { useReservationContext } from '../context/ReservationContext';

export const RestaurantList = () => {
  const {
    filteredRestaurants,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    selectedLocation,
    setSelectedLocation,
    selectedCuisine,
    setSelectedCuisine,
    minRating,
    setMinRating,
    locationsList,
    cuisinesList,
    resetFilters,
    refetch
  } = useRestaurants();

  const { selectRestaurant } = useReservationContext();
  const navigate = useNavigate();

  const handleQuickReserve = (restaurant) => {
    selectRestaurant(restaurant);
    navigate('/reservation/date-time');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8ECE4] text-[#56664C] text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-[#879779]" />
          <span>Warm & Thoughtful Dining</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#393A32]">
          Discover Welcoming Tables
        </h1>
        <p className="text-sm text-[#77786C]">
          Browse cozy neighborhood kitchens, check seating availability, and reserve in peace.
        </p>
      </div>

      {/* Search Bar with useRef auto-focus */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
      />

      {/* Filter Panel */}
      <FilterPanel
        locations={locationsList}
        cuisines={cuisinesList}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
        selectedCuisine={selectedCuisine}
        onSelectCuisine={setSelectedCuisine}
        minRating={minRating}
        onSelectMinRating={setMinRating}
        onReset={resetFilters}
        totalResults={filteredRestaurants.length}
      />

      {/* Loading & Error States */}
      {loading && <Loading message="Loading comfortable dining spots..." />}

      {error && (
        <div className="p-8 rounded-3xl bg-[#FAF3F0] border border-[#E7C8BE] text-center max-w-lg mx-auto">
          <AlertCircle className="w-8 h-8 text-[#C58F78] mx-auto mb-2" />
          <h3 className="font-bold text-[#9B5F48]">Connection Note</h3>
          <p className="text-xs text-[#77786C] mt-1 mb-4">{error}</p>
          <Button variant="outline" size="sm" onClick={refetch}>
            Try Refreshing
          </Button>
        </div>
      )}

      {/* No Restaurants Found Conditional Rendering */}
      {!loading && !error && filteredRestaurants.length === 0 && (
        <div className="p-12 rounded-3xl bg-[#FFFDF7] border border-[#E5DFD2] text-center max-w-md mx-auto shadow-cozy">
          <div className="w-14 h-14 mx-auto mb-4 bg-[#F7F4EC] rounded-2xl flex items-center justify-center text-[#879779]">
            <Sparkles className="w-6 h-6 text-[#879779]" />
          </div>
          <h3 className="font-display text-xl font-bold text-[#393A32] mb-1">
            No restaurants found
          </h3>
          <p className="text-xs text-[#77786C] mb-6">
            We couldn’t find any establishments matching "{searchTerm || selectedCuisine || selectedLocation}". Try clearing filters or altering search keywords.
          </p>
          <Button variant="primary" size="sm" onClick={resetFilters}>
            Reset All Filters
          </Button>
        </div>
      )}

      {/* Restaurants Grid */}
      {!loading && !error && filteredRestaurants.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onQuickSelect={handleQuickReserve}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
