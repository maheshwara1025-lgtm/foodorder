// src/components/common/DatePicker.jsx
import React from 'react';
import { Calendar } from 'lucide-react';

export const DatePicker = ({
  label = 'Reservation Date',
  value,
  onChange,
  minDate = new Date().toISOString().split('T')[0],
  maxDate,
  error,
  required,
  className = ''
}) => {
  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-brand-700 flex items-center justify-between">
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
        </label>
      )}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-brand-400">
          <Calendar className="w-4 h-4" />
        </div>
        <input
          type="date"
          value={value}
          min={minDate}
          max={maxDate}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full rounded-xl border bg-white text-brand-900 pl-10 pr-3.5 py-2.5 text-sm transition duration-150 focus:outline-none focus:ring-2 ${
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-brand-200 focus:border-gold-500 focus:ring-gold-500/20'
          }`}
        />
      </div>
      {error && <p className="text-xs font-medium text-rose-500 mt-0.5">{error}</p>}
    </div>
  );
};

export default DatePicker;
