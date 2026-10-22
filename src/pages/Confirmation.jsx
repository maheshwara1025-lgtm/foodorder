// src/pages/Confirmation.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, Users, Utensils, MapPin, Download, ArrowRight, Home } from 'lucide-react';
import Button from '../components/common/Button';

export const Confirmation = () => {
  const location = useLocation();
  const reservation = location.state?.reservation || {
    id: 1001,
    restaurantName: 'L’Étoile Bistro',
    cuisine: 'French',
    location: 'Downtown',
    date: '2026-10-25',
    time: '07:30 PM',
    guests: 2,
    tableName: 'Table 1 (Window Alcove)',
    fullName: 'Alexander Wright',
    email: 'alex@example.com',
    status: 'Confirmed'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] shadow-cozy overflow-hidden text-center">
        {/* Success Header: Calm Sage Green Accent */}
        <div className="bg-[#EFECE2] text-[#393A32] p-10 border-b border-[#E5DFD2] relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#E8ECE4] text-[#879779] rounded-2xl flex items-center justify-center border border-[#D2DCD0] shadow-sm">
            <CheckCircle2 className="w-9 h-9 text-[#879779]" />
          </div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#879779] block mb-1">
            Table Reserved & Welcomed
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            We Look Forward to Seeing You
          </h1>
          <p className="text-xs text-[#77786C] mt-2">
            Reservation Code: <strong className="text-[#393A32] font-mono">#{reservation.id}</strong>
          </p>
        </div>

        {/* Content Matrix */}
        <div className="p-8 sm:p-10 space-y-8">
          <div className="bg-[#F7F4EC] p-6 rounded-3xl border border-[#E5DFD2] text-left space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#879779]">
                Dining Space
              </span>
              <h2 className="font-display text-2xl font-bold text-[#393A32]">
                {reservation.restaurantName}
              </h2>
              <p className="text-xs text-[#77786C] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#879779]" />
                <span>{reservation.location || 'Neighborhood Dining District'}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#E5DFD2]">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#77786C] block">Date</span>
                <p className="text-sm font-bold text-[#393A32] mt-0.5">{reservation.date}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#77786C] block">Time</span>
                <p className="text-sm font-bold text-[#393A32] mt-0.5">{reservation.time}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#77786C] block">Party</span>
                <p className="text-sm font-bold text-[#393A32] mt-0.5">{reservation.guests} Guests</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#77786C] block">Table</span>
                <p className="text-sm font-bold text-[#393A32] mt-0.5 truncate">{reservation.tableName || 'Selected Table'}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#77786C] max-w-lg mx-auto leading-relaxed">
            A confirmation notification has been recorded for <strong className="text-[#393A32]">{reservation.email || 'your email'}</strong>. Please feel free to present this reference code upon arrival.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#E5DFD2]">
            <Button
              variant="outline"
              size="md"
              icon={Download}
              onClick={handlePrint}
            >
              Print Confirmation Voucher
            </Button>

            <Link to="/reservations">
              <Button variant="primary" size="md" icon={ArrowRight}>
                View My Reservations
              </Button>
            </Link>

            <Link to="/">
              <Button variant="ghost" size="md" icon={Home} className="text-[#77786C] hover:text-[#393A32]">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
