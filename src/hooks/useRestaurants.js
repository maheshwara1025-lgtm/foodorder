// src/hooks/useRestaurants.js
import { useState, useEffect, useMemo, useCallback } from 'react';
import fetchWithAuth from '../services/api';

export function useRestaurants(options = {}) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState(options.defaultSearch || '');
  const [selectedLocation, setSelectedLocation] = useState(options.defaultLocation || 'All');
  const [selectedCuisine, setSelectedCuisine] = useState(options.defaultCuisine || 'All');
  const [minRating, setMinRating] = useState(options.defaultMinRating || 0);
  const [selectedDate, setSelectedDate] = useState(options.defaultDate || new Date().toISOString().split('T')[0]);

  // Load restaurant data via REST API
  const loadRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth('/api/restaurants');
      setRestaurants(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurant listings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  // Extract unique filter options
  const locationsList = useMemo(() => {
    const locs = new Set(restaurants.map((r) => r.location));
    return ['All', ...Array.from(locs)];
  }, [restaurants]);

  const cuisinesList = useMemo(() => {
    const c = new Set(restaurants.map((r) => r.cuisine));
    return ['All', ...Array.from(c)];
  }, [restaurants]);

  // useMemo for filtered restaurants list
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesSearch =
        !searchTerm.trim() ||
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All' || r.location.toLowerCase() === selectedLocation.toLowerCase();

      const matchesCuisine =
        selectedCuisine === 'All' || r.cuisine.toLowerCase() === selectedCuisine.toLowerCase();

      const matchesRating = r.rating >= minRating;

      return matchesSearch && matchesLocation && matchesCuisine && matchesRating;
    });
  }, [restaurants, searchTerm, selectedLocation, selectedCuisine, minRating]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedLocation('All');
    setSelectedCuisine('All');
    setMinRating(0);
  }, []);

  return {
    restaurants,
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
    selectedDate,
    setSelectedDate,
    locationsList,
    cuisinesList,
    refetch: loadRestaurants,
    resetFilters
  };
}

export default useRestaurants;
