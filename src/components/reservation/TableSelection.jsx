// src/components/reservation/TableSelection.jsx
import React from 'react';
import { LayoutGrid, AlertCircle, Sparkles } from 'lucide-react';
import TableCard from './TableCard';
import Loading from '../common/Loading';

export const TableSelection = ({
  tables = [],
  loading = false,
  error = null,
  selectedTable,
  onSelectTable,
  guests = 2,
  tableStats = {}
}) => {
  if (loading) {
    return <Loading message="Querying live restaurant floorplan & table status..." />;
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-center text-rose-700">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-rose-500" />
        <p className="font-semibold">{error}</p>
        <span className="text-xs text-rose-500">Please select another date/time or retry.</span>
      </div>
    );
  }

  if (!tables || tables.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-brand-50 border border-brand-200 text-center">
        <AlertCircle className="w-8 h-8 mx-auto mb-2 text-brand-400" />
        <h4 className="font-bold text-brand-800">No tables available</h4>
        <p className="text-xs text-brand-500 mt-1">
          No table seating records found for this slot. Please alter date or time slot.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Table Stats header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-brand-50/70 p-4 rounded-xl border border-brand-200/80">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-gold-600" />
          <span className="text-xs font-bold text-brand-900 uppercase tracking-wider">
            Restaurant Floorplan Overview
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-brand-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Available ({tableStats.available || 0})</span>
          </span>
          <span className="flex items-center gap-1.5 text-brand-600">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span>Reserved ({tableStats.occupied || 0})</span>
          </span>
          <span className="text-gold-700 font-semibold">
            {tableStats.percentAvailable || 0}% Open
          </span>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            isSelected={selectedTable?.id === table.id}
            onSelect={onSelectTable}
            requiredGuests={guests}
          />
        ))}
      </div>

      {!selectedTable && (
        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Please select a table that accommodates your party size to proceed.</span>
        </div>
      )}
    </div>
  );
};

export default TableSelection;
