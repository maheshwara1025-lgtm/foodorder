// src/hooks/useReservation.js
import { useState, useCallback, useMemo } from 'react';
import fetchWithAuth from '../services/api';
import { useReservationStore } from '../store/reservationStore';

export function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Connect to Zustand store
  const selectedRestaurant = useReservationStore((s) => s.selectedRestaurant);
  const date = useReservationStore((s) => s.date);
  const time = useReservationStore((s) => s.time);
  const guests = useReservationStore((s) => s.guests);
  const selectedTable = useReservationStore((s) => s.selectedTable);
  const specialRequests = useReservationStore((s) => s.specialRequests);
  const dietaryPreferences = useReservationStore((s) => s.dietaryPreferences);
  const customerInfo = useReservationStore((s) => s.customerInfo);

  const setRestaurant = useReservationStore((s) => s.setRestaurant);
  const setDate = useReservationStore((s) => s.setDate);
  const setTime = useReservationStore((s) => s.setTime);
  const setGuests = useReservationStore((s) => s.setGuests);
  const setTable = useReservationStore((s) => s.setTable);
  const setSpecialRequests = useReservationStore((s) => s.setSpecialRequests);
  const setDietaryPreferences = useReservationStore((s) => s.setDietaryPreferences);
  const setCustomerInfo = useReservationStore((s) => s.setCustomerInfo);
  const clearReservationState = useReservationStore((s) => s.clearReservationState);

  // useMemo for calculated reservation details
  const reservationSummary = useMemo(() => {
    return {
      restaurant: selectedRestaurant,
      date,
      time,
      guests,
      table: selectedTable,
      specialRequests,
      dietaryPreferences,
      customerInfo,
      isValid: !!(selectedRestaurant && date && time && selectedTable)
    };
  }, [selectedRestaurant, date, time, guests, selectedTable, specialRequests, dietaryPreferences, customerInfo]);

  // Create reservation action (POST)
  const createReservation = useCallback(
    async (reservationData) => {
      setLoading(true);
      setError(null);
      try {
        const payload = reservationData || {
          restaurantId: selectedRestaurant?.id,
          restaurantName: selectedRestaurant?.name,
          cuisine: selectedRestaurant?.cuisine,
          location: selectedRestaurant?.location,
          image: selectedRestaurant?.image,
          date,
          time,
          guests,
          tableId: selectedTable?.id,
          tableName: selectedTable?.name,
          seatingArea: selectedTable?.location,
          fullName: customerInfo.fullName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          specialRequests,
          dietaryPreferences
        };

        const response = await fetchWithAuth('/api/protected/reservations', {
          method: 'POST',
          body: JSON.stringify(payload)
        });

        clearReservationState();
        return response;
      } catch (err) {
        setError(err.message || 'Failed to create reservation');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [selectedRestaurant, date, time, guests, selectedTable, customerInfo, specialRequests, dietaryPreferences, clearReservationState]
  );

  // Get user reservations (GET)
  const getMyReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithAuth('/api/protected/reservations', { method: 'GET' });
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load reservations');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Update reservation (PUT/PATCH)
  const updateReservation = useCallback(async (id, updatedDetails) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`/api/protected/reservations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedDetails)
      });
      return response;
    } catch (err) {
      setError(err.message || 'Failed to update reservation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel reservation (DELETE)
  const cancelReservation = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchWithAuth(`/api/protected/reservations/${id}`, { method: 'DELETE' });
      return res;
    } catch (err) {
      setError(err.message || 'Failed to cancel reservation');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    selectedRestaurant,
    date,
    time,
    guests,
    selectedTable,
    specialRequests,
    dietaryPreferences,
    customerInfo,
    reservationSummary,
    loading,
    error,

    // Store Actions
    setRestaurant,
    setDate,
    setTime,
    setGuests,
    setTable,
    setSpecialRequests,
    setDietaryPreferences,
    setCustomerInfo,
    clearReservationState,

    // API CRUD Actions
    createReservation,
    getMyReservations,
    updateReservation,
    cancelReservation
  };
}

export default useReservation;
