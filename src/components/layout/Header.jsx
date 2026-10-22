// src/components/layout/Header.jsx
import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Utensils, CalendarCheck, User, LogOut, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

export const Header = () => {
  const { user, isAuthenticated, logout, simulateTokenExpiry } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'text-[#393A32] bg-[#E8DDC9]/70 font-semibold shadow-sm'
        : 'text-[#77786C] hover:text-[#393A32] hover:bg-[#EFECE2]/70'
    }`;

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-[#E5DFD2] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#879779] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#393A32] block">
                Table<span className="text-[#879779]">Mate</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#77786C] -mt-1 block">
                Peaceful Table Reservations
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1.5">
            <NavLink to="/" className={navLinkClasses} end>
              Home
            </NavLink>
            <NavLink to="/restaurants" className={navLinkClasses}>
              Discover Places
            </NavLink>
            <NavLink to="/reservation" className={navLinkClasses}>
              Book a Table
            </NavLink>
            <NavLink to="/reservations" className={navLinkClasses}>
              My Bookings
            </NavLink>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {/* Expire token test button (Experiment 4 demo) */}
                <button
                  type="button"
                  title="Simulate 401 Expired Token test"
                  onClick={() => {
                    simulateTokenExpiry();
                    alert('Token expired! Try accessing a protected action to see 401 handling.');
                  }}
                  className="hidden lg:flex items-center gap-1 text-[11px] text-[#C58F78] hover:text-[#9B5F48] bg-[#FAF3F0] border border-[#E7C8BE] px-2.5 py-1 rounded-lg transition"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Simulate 401</span>
                </button>

                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold text-[#393A32]">{user?.name}</span>
                  <span className="text-[10px] text-[#879779] font-medium">{user?.role || 'Guest Patron'}</span>
                </div>
                <Link
                  to="/reservations"
                  className="p-2 text-[#77786C] hover:text-[#393A32] rounded-xl hover:bg-[#EFECE2]"
                  title="View Bookings"
                >
                  <CalendarCheck className="w-5 h-5" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-[#77786C] hover:text-[#C58F78] hover:bg-[#FAF3F0]"
                  icon={LogOut}
                >
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-[#393A32] hover:bg-[#EFECE2]">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm" icon={User}>
                    Join TableMate
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
