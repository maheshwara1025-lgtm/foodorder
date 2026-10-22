// src/pages/TablesView.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Utensils, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { useReservationContext } from '../context/ReservationContext';
import { useRestaurants } from '../hooks/useRestaurants';
import TableSelection from '../components/reservation/TableSelection';
import Button from '../components/common/Button';

export const TablesView = () => {
  const navigate = useNavigate();
  const { restaurants } = useRestaurants();
  const {
    selectedRestaurant,
    selectRestaurant,
    liveTables,
    tablesLoading,
    tablesError,
    selectedTable,
    selectTable,
    guests,
    tableAvailabilityStats
  } = useReservationContext();

  const activeVenue = selectedRestaurant || (restaurants && restaurants[0]);

  const handleVenueChange = (restId) => {
    const found = restaurants.find((r) => r.id === Number(restId));
    if (found) {
      selectRestaurant(found);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-xs font-semibold uppercase tracking-wider mb-2">
            <LayoutGrid className="w-3.5 h-3.5 text-gold-600" />
            <span>Interactive Seating & Capacity</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-brand-900">
            Live Restaurant Floorplans & Tables
          </h1>
          <p className="text-xs text-brand-500 mt-0.5">
            View real-time table layout, seating capacity, and occupancy status across dining rooms.
          </p>
        </div>

        {/* Restaurant selector dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold uppercase text-brand-500">Venue:</label>
          <select
            value={activeVenue?.id || 101}
            onChange={(e) => handleVenueChange(e.target.value)}
            className="bg-white border border-brand-200 rounded-xl px-4 py-2.5 text-sm font-medium text-brand-900 focus:outline-none focus:ring-2 focus:ring-gold-500 shadow-sm"
          >
            {restaurants.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.cuisine})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Venue Summary Banner */}
      {activeVenue && (
        <div className="bg-white rounded-3xl p-6 border border-brand-200 shadow-luxury flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={activeVenue.image}
              alt={activeVenue.name}
              className="w-20 h-20 rounded-2xl object-cover border border-brand-200"
            />
            <div>
              <h2 className="font-display text-xl font-bold text-brand-900">{activeVenue.name}</h2>
              <p className="text-xs text-brand-500 flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                <span>{activeVenue.address}</span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold uppercase bg-gold-50 text-gold-700 px-2 py-0.5 rounded-md border border-gold-200">
                  {activeVenue.cuisine}
                </span>
                <span className="text-[10px] text-brand-500">
                  {activeVenue.openingHours}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="gold"
            size="md"
            icon={ArrowRight}
            onClick={() => {
              selectRestaurant(activeVenue);
              navigate('/reservation/date-time');
            }}
          >
            Book Table at this Venue
          </Button>
        </div>
      )}

      {/* Tables Floorplan Component */}
      <div className="bg-white rounded-3xl p-8 border border-brand-200 shadow-luxury">
        <TableSelection
          tables={liveTables.length > 0 ? liveTables : activeVenue?.tables || []}
          loading={tablesLoading}
          error={tablesError}
          selectedTable={selectedTable}
          onSelectTable={(tbl) => {
            if (activeVenue && (!selectedRestaurant || selectedRestaurant.id !== activeVenue.id)) {
              selectRestaurant(activeVenue);
            }
            selectTable(tbl);
          }}
          guests={guests}
          tableStats={tableAvailabilityStats}
        />
      </div>
    </div>
  );
};

export default TablesView;
