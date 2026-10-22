// src/context/ReservationContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import fetchWithAuth from '../services/api';
import { useReservationStore } from '../store/reservationStore';

export const ReservationContext = createContext(null);

export function ReservationProvider({ children }) {
  // Sync with Zustand store
  const selectedRestaurant = useReservationStore((s) => s.selectedRestaurant);
  const date = useReservationStore((s) => s.date);
  const time = useReservationStore((s) => s.time);
  const guests = useReservationStore((s) => s.guests);
  const selectedTable = useReservationStore((s) => s.selectedTable);
  const specialRequests = useReservationStore((s) => s.specialRequests);
  const dietaryPreferences = useReservationStore((s) => s.dietaryPreferences);
  const customerInfo = useReservationStore((s) => s.customerInfo);

  const setRestaurantStore = useReservationStore((s) => s.setRestaurant);
  const setDateStore = useReservationStore((s) => s.setDate);
  const setTimeStore = useReservationStore((s) => s.setTime);
  const setGuestsStore = useReservationStore((s) => s.setGuests);
  const setTableStore = useReservationStore((s) => s.setTable);
  const setSpecialRequestsStore = useReservationStore((s) => s.setSpecialRequests);
  const setDietaryPreferencesStore = useReservationStore((s) => s.setDietaryPreferences);
  const setCustomerInfoStore = useReservationStore((s) => s.setCustomerInfo);
  const clearReservationStore = useReservationStore((s) => s.clearReservationState);

  // Dynamic live table fetching state
  const [liveTables, setLiveTables] = useState([]);
  const [tablesLoading, setTablesLoading] = useState(false);
  const [tablesError, setTablesError] = useState(null);

  // Reservation API CRUD state
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [reservationHistory, setReservationHistory] = useState([]);

  // Fetch tables whenever restaurant, date, or time changes
  useEffect(() => {
    let isMounted = true;
    if (!selectedRestaurant?.id) {
      setLiveTables([]);
      return;
    }

    const fetchTables = async () => {
      setTablesLoading(true);
      setTablesError(null);
      try {
        const query = `/api/tables?restaurantId=${selectedRestaurant.id}&date=${date || ''}&time=${encodeURIComponent(time || '')}`;
        const data = await fetchWithAuth(query);
        if (isMounted) {
          setLiveTables(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setTablesError(err.message || 'Failed to fetch available tables');
        }
      } finally {
        if (isMounted) {
          setTablesLoading(false);
        }
      }
    };

    fetchTables();
    return () => {
      isMounted = false;
    };
  }, [selectedRestaurant?.id, date, time]);

  // Operations
  const selectRestaurant = useCallback((restaurant) => {
    setRestaurantStore(restaurant);
  }, [setRestaurantStore]);

  const selectTable = useCallback((table) => {
    setTableStore(table);
  }, [setTableStore]);

  const updateGuests = useCallback((num) => {
    const parsed = Math.max(1, Math.min(20, Number(num) || 1));
    setGuestsStore(parsed);
  }, [setGuestsStore]);

  const updateDate = useCallback((newDate) => {
    setDateStore(newDate);
  }, [setDateStore]);

  const updateTime = useCallback((newTime) => {
    setTimeStore(newTime);
  }, [setTimeStore]);

  const updateSpecialRequests = useCallback((requests) => {
    setSpecialRequestsStore(requests);
  }, [setSpecialRequestsStore]);

  const updateDietaryPreferences = useCallback((prefs) => {
    setDietaryPreferencesStore(prefs);
  }, [setDietaryPreferencesStore]);

  const updateCustomerInfo = useCallback((info) => {
    setCustomerInfoStore(info);
  }, [setCustomerInfoStore]);

  const clearReservation = useCallback(() => {
    clearReservationStore();
  }, [clearReservationStore]);

  // useMemo for calculated values
  const availableTables = useMemo(() => {
    return liveTables.filter((tbl) => tbl.status === 'available');
  }, [liveTables]);

  const totalSeatingCapacity = useMemo(() => {
    return liveTables.reduce((acc, tbl) => acc + tbl.capacity, 0);
  }, [liveTables]);

  const suitableTables = useMemo(() => {
    return availableTables.filter((tbl) => tbl.capacity >= guests);
  }, [availableTables, guests]);

  const tableAvailabilityStats = useMemo(() => {
    const total = liveTables.length;
    const available = availableTables.length;
    const occupied = total - available;
    const percentAvailable = total > 0 ? Math.round((available / total) * 100) : 0;
    return { total, available, occupied, percentAvailable };
  }, [liveTables, availableTables]);

  const reservationDetailsSummary = useMemo(() => {
    return {
      restaurantName: selectedRestaurant?.name || 'None selected',
      cuisine: selectedRestaurant?.cuisine || '-',
      location: selectedRestaurant?.location || '-',
      address: selectedRestaurant?.address || '-',
      date: date || 'Not chosen',
      time: time || 'Not chosen',
      guests,
      tableName: selectedTable?.name || 'None chosen',
      tableCapacity: selectedTable?.capacity || 0,
      tableType: selectedTable?.type || '-',
      specialRequests: specialRequests || 'None',
      dietaryPreferences: dietaryPreferences || 'None',
      customerName: customerInfo?.fullName || '',
      customerEmail: customerInfo?.email || '',
      customerPhone: customerInfo?.phone || '',
      isComplete: !!(selectedRestaurant && date && time && selectedTable && customerInfo?.fullName && customerInfo?.email)
    };
  }, [selectedRestaurant, date, time, guests, selectedTable, specialRequests, dietaryPreferences, customerInfo]);

  // CRUD Operations
  const fetchReservationHistory = useCallback(async () => {
    setApiLoading(true);
    setApiError(null);
    try {
      const data = await fetchWithAuth('/api/protected/reservations', { method: 'GET' });
      setReservationHistory(data || []);
      return data;
    } catch (err) {
      setApiError(err.message);
      return [];
    } finally {
      setApiLoading(false);
    }
  }, []);

  const createReservation = useCallback(async (customPayload = null) => {
    setApiLoading(true);
    setApiError(null);
    try {
      const payload = customPayload || {
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

      const created = await fetchWithAuth('/api/protected/reservations', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      setReservationHistory((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setApiError(err.message);
      throw err;
    } finally {
      setApiLoading(false);
    }
  }, [selectedRestaurant, date, time, guests, selectedTable, customerInfo, specialRequests, dietaryPreferences]);

  const modifyReservation = useCallback(async (id, updatedFields) => {
    setApiLoading(true);
    setApiError(null);
    try {
      const result = await fetchWithAuth(`/api/protected/reservations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedFields)
      });
      setReservationHistory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
      );
      return result;
    } catch (err) {
      setApiError(err.message);
      throw err;
    } finally {
      setApiLoading(false);
    }
  }, []);

  const cancelReservation = useCallback(async (id) => {
    setApiLoading(true);
    setApiError(null);
    try {
      await fetchWithAuth(`/api/protected/reservations/${id}`, {
        method: 'DELETE'
      });
      setReservationHistory((prev) => prev.filter((r) => r.id !== id));
      return true;
    } catch (err) {
      setApiError(err.message);
      throw err;
    } finally {
      setApiLoading(false);
    }
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        selectedRestaurant,
        date,
        time,
        guests,
        selectedTable,
        specialRequests,
        dietaryPreferences,
        customerInfo,
        liveTables,
        tablesLoading,
        tablesError,

        availableTables,
        suitableTables,
        totalSeatingCapacity,
        tableAvailabilityStats,
        reservationDetailsSummary,

        selectRestaurant,
        selectTable,
        updateGuests,
        updateDate,
        updateTime,
        updateSpecialRequests,
        updateDietaryPreferences,
        updateCustomerInfo,
        clearReservation,

        reservationHistory,
        fetchReservationHistory,
        createReservation,
        modifyReservation,
        cancelReservation,
        apiLoading,
        apiError
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservationContext() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservationContext must be used within a ReservationProvider');
  }
  return context;
}

export default ReservationContext;
