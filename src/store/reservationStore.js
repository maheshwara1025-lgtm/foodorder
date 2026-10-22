// src/store/reservationStore.js
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

// Action Logger Middleware to monitor store actions
const actionLoggerMiddleware = (config) => (set, get, api) =>
  config(
    (...args) => {
      const prevState = get();
      set(...args);
      const nextState = get();
      if (process.env.NODE_ENV !== 'production') {
        console.groupCollapsed(`[ReservationStore Action]`);
        console.log('Previous State:', prevState);
        console.log('Action Argument:', args);
        console.log('Next State:', nextState);
        console.groupEnd();
      }
    },
    get,
    api
  );

export const useReservationStore = create(
  devtools(
    actionLoggerMiddleware(
      persist(
        (set, get) => ({
          // State
          selectedRestaurant: null,
          date: new Date().toISOString().split('T')[0],
          time: '07:00 PM',
          guests: 2,
          selectedTable: null,
          specialRequests: '',
          dietaryPreferences: 'None',
          customerInfo: {
            fullName: '',
            email: '',
            phone: '',
            occasion: 'Dinner'
          },

          // Actions
          setRestaurant: (restaurant) =>
            set({
              selectedRestaurant: restaurant,
              selectedTable: null
            }),

          setDate: (date) => set({ date, selectedTable: null }),

          setTime: (time) => set({ time, selectedTable: null }),

          setDateTime: (date, time) => set({ date, time, selectedTable: null }),

          setGuests: (guests) => set({ guests, selectedTable: null }),

          setTable: (table) => set({ selectedTable: table }),

          setSpecialRequests: (specialRequests) => set({ specialRequests }),

          setDietaryPreferences: (dietaryPreferences) => set({ dietaryPreferences }),

          setCustomerInfo: (info) =>
            set((state) => ({
              customerInfo: { ...state.customerInfo, ...info }
            })),

          clearReservationState: () =>
            set({
              selectedRestaurant: null,
              date: new Date().toISOString().split('T')[0],
              time: '07:00 PM',
              guests: 2,
              selectedTable: null,
              specialRequests: '',
              dietaryPreferences: 'None',
              customerInfo: {
                fullName: '',
                email: '',
                phone: '',
                occasion: 'Dinner'
              }
            }),

          isStepReady: (step) => {
            const state = get();
            switch (step) {
              case 'restaurant':
                return !!state.selectedRestaurant;
              case 'datetime':
                return !!(state.selectedRestaurant && state.date && state.time);
              case 'table':
                return !!(state.selectedRestaurant && state.date && state.time && state.selectedTable);
              case 'details':
                return !!(
                  state.selectedRestaurant &&
                  state.date &&
                  state.time &&
                  state.selectedTable &&
                  state.customerInfo.fullName &&
                  state.customerInfo.email &&
                  state.customerInfo.phone
                );
              default:
                return true;
            }
          }
        }),
        {
          name: 'tablemate_global_reservation_store',
          partialize: (state) => ({
            selectedRestaurant: state.selectedRestaurant,
            date: state.date,
            time: state.time,
            guests: state.guests,
            selectedTable: state.selectedTable,
            specialRequests: state.specialRequests,
            dietaryPreferences: state.dietaryPreferences,
            customerInfo: state.customerInfo
          })
        }
      )
    ),
    { name: 'ReservationStore' }
  )
);

export default useReservationStore;
