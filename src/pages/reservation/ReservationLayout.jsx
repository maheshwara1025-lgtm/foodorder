// src/pages/reservation/ReservationLayout.jsx
import React from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Calendar, LayoutGrid, UserCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useReservationContext } from '../../context/ReservationContext';
import Button from '../../components/common/Button';

export const ReservationLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedRestaurant, clearReservation } = useReservationContext();

  const currentPath = location.pathname;

  const steps = [
    {
      id: 'date-time',
      label: 'Date & Time',
      path: '/reservation/date-time',
      icon: Calendar
    },
    {
      id: 'table',
      label: 'Table Selection',
      path: '/reservation/table',
      icon: LayoutGrid
    },
    {
      id: 'details',
      label: 'Guest Details',
      path: '/reservation/details',
      icon: UserCheck
    },
    {
      id: 'summary',
      label: 'Summary',
      path: '/reservation/summary',
      icon: FileText
    }
  ];

  const activeIndex = steps.findIndex((s) => currentPath.includes(s.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Restaurant context banner */}
      <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] p-5 shadow-cozy flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {selectedRestaurant?.image ? (
            <img
              src={selectedRestaurant.image}
              alt={selectedRestaurant.name}
              className="w-14 h-14 rounded-2xl object-cover border border-[#E5DFD2]"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-[#E8ECE4] text-[#879779] flex items-center justify-center font-bold">
              Table
            </div>
          )}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#879779]">
              Selected Space
            </span>
            <h2 className="font-display text-xl font-bold text-[#393A32]">
              {selectedRestaurant?.name || 'Please select a dining space'}
            </h2>
            <p className="text-xs text-[#77786C]">
              {selectedRestaurant?.cuisine || 'Cuisine'} • {selectedRestaurant?.location || 'Select dining space to begin'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/restaurants">
            <Button variant="ghost" size="sm" className="text-xs text-[#77786C] hover:text-[#393A32]">
              Change Space
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearReservation();
              navigate('/restaurants');
            }}
            className="text-xs text-[#9B5F48] border-[#E7C8BE] hover:bg-[#FAF3F0]"
          >
            Cancel Flow
          </Button>
        </div>
      </div>

      {/* Progress Stepper Bar */}
      <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] p-4 sm:p-5 shadow-cozy">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = activeIndex > idx;
            const isCurrent = activeIndex === idx || (activeIndex === -1 && idx === 0);

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                  isCurrent
                    ? 'bg-[#E8ECE4]/70 border border-[#D2DCD0]'
                    : isCompleted
                    ? 'bg-[#F7F4EC] border border-[#E5DFD2]'
                    : 'opacity-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCompleted
                      ? 'bg-[#788B68] text-white'
                      : isCurrent
                      ? 'bg-[#879779] text-white'
                      : 'bg-[#EFECE2] text-[#77786C]'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                <div className="overflow-hidden">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#77786C] block">
                    Step {idx + 1}
                  </span>
                  <p className="text-xs font-bold text-[#393A32] truncate">{step.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Nested Routing Render via Outlet */}
      <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] shadow-cozy p-6 sm:p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default ReservationLayout;
