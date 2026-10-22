// src/pages/reservation/DateTimeStep.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useReservationContext } from '../../context/ReservationContext';
import DatePicker from '../../components/common/DatePicker';
import Button from '../../components/common/Button';

export const DateTimeStep = () => {
  const navigate = useNavigate();
  const {
    selectedRestaurant,
    date,
    time,
    guests,
    updateDate,
    updateTime,
    updateGuests
  } = useReservationContext();

  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  const timeSlots = selectedRestaurant?.availableTimeSlots || [
    '12:00 PM', '12:30 PM', '01:00 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'
  ];

  const handleNext = (e) => {
    e.preventDefault();
    let valid = true;

    if (!date) {
      setDateError('Please choose a reservation date.');
      valid = false;
    } else {
      setDateError('');
    }

    if (!time) {
      setTimeError('Please select a dining time slot.');
      valid = false;
    } else {
      setTimeError('');
    }

    if (valid) {
      navigate('/reservation/table');
    }
  };

  return (
    <form onSubmit={handleNext} className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h3 className="font-display text-2xl font-bold text-[#393A32]">Select Date, Time & Party Size</h3>
        <p className="text-xs text-[#77786C] mt-1">
          Tables and seating availability adapt automatically based on your schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Date Picker */}
        <DatePicker
          label="Reservation Date"
          value={date}
          required
          onChange={(newDate) => {
            updateDate(newDate);
            setDateError('');
          }}
          error={dateError}
        />

        {/* Guest Count */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55] flex items-center justify-between">
            <span>Party Size (Guests) <span className="text-[#C58F78]">*</span></span>
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 pointer-events-none text-[#77786C]">
              <Users className="w-4 h-4" />
            </div>
            <select
              value={guests}
              onChange={(e) => updateGuests(Number(e.target.value))}
              className="w-full rounded-xl border border-[#E5DFD2] bg-[#FFFDF7] text-[#393A32] pl-10 pr-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#879779]/20 focus:border-[#879779]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Guest (Quiet Table)' : 'Guests'}
                </option>
              ))}
            </select>
          </div>
          <span className="text-[11px] text-[#77786C]">Capacity checks will filter suitable tables.</span>
        </div>
      </div>

      {/* Time Slots Selection */}
      <div className="space-y-3 pt-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#879779]" />
            <span>Available Seating Times</span>
          </span>
          <span className="text-[10px] text-[#77786C] font-normal">Real-Time Allocation</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {timeSlots.map((slot) => {
            const isSelected = time === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => {
                  updateTime(slot);
                  setTimeError('');
                }}
                className={`py-3 px-3 rounded-2xl border text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#879779] text-white border-[#879779] shadow-sm ring-2 ring-[#879779]/20'
                    : 'bg-[#F7F4EC] border-[#E5DFD2] text-[#393A32] hover:bg-[#E8ECE4] hover:border-[#879779]/50'
                }`}
              >
                {isSelected && <Sparkles className="w-3 h-3 text-white" />}
                <span>{slot}</span>
              </button>
            );
          })}
        </div>
        {timeError && <p className="text-xs font-medium text-[#9B5F48]">{timeError}</p>}
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-[#E5DFD2] flex justify-end">
        <Button variant="primary" size="lg" type="submit" icon={ArrowRight}>
          Continue to Table Selection
        </Button>
      </div>
    </form>
  );
};

export default DateTimeStep;
