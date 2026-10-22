// src/components/reservation/ReservationSummary.jsx
import React from 'react';
import { Calendar, Clock, Users, Utensils, MapPin, ShieldCheck } from 'lucide-react';

export const ReservationSummary = ({ summary }) => {
  return (
    <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] shadow-cozy overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#EFECE2] text-[#393A32] p-6 border-b border-[#E5DFD2] relative overflow-hidden">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#879779] block mb-1">
          Confirmed Itinerary
        </span>
        <h3 className="font-display text-2xl font-bold">{summary.restaurantName}</h3>
        <p className="text-xs text-[#77786C] flex items-center gap-1.5 mt-1">
          <MapPin className="w-3.5 h-3.5 text-[#879779]" />
          <span>{summary.address}</span>
        </p>
      </div>

      {/* Summary Matrix */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#E5DFD2]">
          <div className="bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2]">
            <span className="text-[10px] uppercase font-bold text-[#77786C] flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#879779]" /> Date
            </span>
            <p className="text-sm font-bold text-[#393A32] mt-1">{summary.date}</p>
          </div>

          <div className="bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2]">
            <span className="text-[10px] uppercase font-bold text-[#77786C] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#879779]" /> Time
            </span>
            <p className="text-sm font-bold text-[#393A32] mt-1">{summary.time}</p>
          </div>

          <div className="bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2]">
            <span className="text-[10px] uppercase font-bold text-[#77786C] flex items-center gap-1">
              <Users className="w-3 h-3 text-[#879779]" /> Guests
            </span>
            <p className="text-sm font-bold text-[#393A32] mt-1">{summary.guests} Persons</p>
          </div>

          <div className="bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2]">
            <span className="text-[10px] uppercase font-bold text-[#77786C] flex items-center gap-1">
              <Utensils className="w-3 h-3 text-[#879779]" /> Table
            </span>
            <p className="text-sm font-bold text-[#393A32] mt-1 line-clamp-1">{summary.tableName}</p>
          </div>
        </div>

        {/* Detailed Patron & Preference info */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between py-2 border-b border-[#E5DFD2]">
            <span className="text-[#77786C] font-medium">Reserved Guest Name:</span>
            <span className="font-bold text-[#393A32]">{summary.customerName || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#E5DFD2]">
            <span className="text-[#77786C] font-medium">Contact Email:</span>
            <span className="font-semibold text-[#393A32]">{summary.customerEmail || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#E5DFD2]">
            <span className="text-[#77786C] font-medium">Contact Phone:</span>
            <span className="font-semibold text-[#393A32]">{summary.customerPhone || 'N/A'}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-[#E5DFD2]">
            <span className="text-[#77786C] font-medium">Dietary Preferences:</span>
            <span className="font-semibold text-[#56664C] bg-[#E8ECE4] px-2.5 py-0.5 rounded-full border border-[#D2DCD0]">
              {summary.dietaryPreferences || 'Standard'}
            </span>
          </div>

          <div className="py-2">
            <span className="text-[#77786C] font-medium block mb-1">Special Requests:</span>
            <p className="text-[#393A32] bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2] italic">
              "{summary.specialRequests || 'No special requests submitted'}"
            </p>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="flex items-center gap-3 p-3.5 bg-[#E8ECE4] rounded-2xl border border-[#D2DCD0] text-xs text-[#56664C]">
          <ShieldCheck className="w-5 h-5 text-[#879779] shrink-0" />
          <span>
            Table held gently for 15 minutes past reservation time. No booking fees applied.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;
