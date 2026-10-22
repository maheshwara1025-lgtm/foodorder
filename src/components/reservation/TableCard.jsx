// src/components/reservation/TableCard.jsx
import React from 'react';
import { Users, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export const TableCard = ({
  table,
  isSelected,
  onSelect,
  requiredGuests = 1
}) => {
  const isAvailable = table.status === 'available';
  const isTooSmall = table.capacity < requiredGuests;

  const getBadgeColor = () => {
    if (!isAvailable) return 'bg-[#FAF3F0] text-[#9B5F48] border-[#E7C8BE]';
    if (isTooSmall) return 'bg-[#FAF7F0] text-[#B39972] border-[#E8DDC9]';
    return 'bg-[#E8ECE4] text-[#56664C] border-[#D2DCD0]';
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && isAvailable && !isTooSmall) {
      e.preventDefault();
      onSelect(table);
    }
  };

  return (
    <div
      role="button"
      tabIndex={isAvailable && !isTooSmall ? 0 : -1}
      aria-pressed={isSelected}
      aria-label={`${table.name}, capacity ${table.capacity} guests, ${table.status}, ${table.location}`}
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (isAvailable && !isTooSmall) {
          onSelect(table);
        }
      }}
      className={`relative p-5 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#879779] focus:ring-offset-2 ${
        isSelected
          ? 'bg-[#E8ECE4]/70 border-[#879779] shadow-sm ring-2 ring-[#879779]/20'
          : isAvailable && !isTooSmall
          ? 'bg-[#FFFDF7] border-[#E5DFD2] hover:border-[#879779]/60 hover:shadow-sm'
          : 'bg-[#F7F4EC] border-[#E5DFD2] opacity-60 cursor-not-allowed'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#77786C]">
              {table.id}
            </span>
            <h4 className="text-sm font-bold text-[#393A32] line-clamp-1">{table.name}</h4>
          </div>

          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeColor()}`}
          >
            {!isAvailable ? 'Occupied' : isTooSmall ? 'Capacity Small' : 'Available'}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-[#5E5F55]">
          <div className="flex items-center gap-1.5 font-medium">
            <Users className="w-4 h-4 text-[#77786C]" />
            <span>
              Up to <strong className="text-[#393A32]">{table.capacity} guests</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#77786C]">
            <Sparkles className="w-3.5 h-3.5 text-[#879779]" />
            <span>Type: {table.type}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#77786C]">
            <Shield className="w-3.5 h-3.5 text-[#879779]" />
            <span>Area: {table.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E5DFD2] flex items-center justify-between">
        <span className="text-xs font-semibold text-[#5E5F55]">
          {isSelected ? 'Table Selected' : isAvailable && !isTooSmall ? 'Click or press Enter' : 'Unavailable'}
        </span>
        {isSelected && (
          <CheckCircle2 className="w-5 h-5 text-[#879779] fill-[#E8ECE4]" />
        )}
      </div>
    </div>
  );
};

export default TableCard;
