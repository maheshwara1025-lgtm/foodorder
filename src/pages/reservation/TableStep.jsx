// src/pages/reservation/TableStep.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { useReservationContext } from '../../context/ReservationContext';
import TableSelection from '../../components/reservation/TableSelection';
import Button from '../../components/common/Button';

export const TableStep = () => {
  const navigate = useNavigate();
  const {
    liveTables,
    tablesLoading,
    tablesError,
    selectedTable,
    selectTable,
    guests,
    tableAvailabilityStats
  } = useReservationContext();

  const [validationError, setValidationError] = useState('');

  const handleNext = () => {
    if (!selectedTable) {
      setValidationError('Please select a table to proceed with your booking.');
      return;
    }
    setValidationError('');
    navigate('/reservation/details');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h3 className="font-display text-2xl font-bold text-brand-900">Choose Your Dining Table</h3>
        <p className="text-xs text-brand-500 mt-1">
          Review live occupancy, seating capacity, and intimate alcove options.
        </p>
      </div>

      {validationError && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Table Selection Floorplan */}
      <TableSelection
        tables={liveTables}
        loading={tablesLoading}
        error={tablesError}
        selectedTable={selectedTable}
        onSelectTable={(tbl) => {
          selectTable(tbl);
          setValidationError('');
        }}
        guests={guests}
        tableStats={tableAvailabilityStats}
      />

      {/* Action Footer */}
      <div className="pt-6 border-t border-brand-100 flex items-center justify-between">
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => navigate('/reservation/date-time')}
        >
          Previous Step
        </Button>

        <Button
          variant="gold"
          size="lg"
          icon={ArrowRight}
          onClick={handleNext}
          disabled={!selectedTable}
        >
          Continue to Guest Details
        </Button>
      </div>
    </div>
  );
};

export default TableStep;
