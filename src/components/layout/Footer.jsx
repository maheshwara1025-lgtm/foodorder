// src/components/layout/Footer.jsx
import React from 'react';
import { Utensils, Heart, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#EFECE2] text-[#393A32] border-t border-[#E5DFD2] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#879779] flex items-center justify-center text-white">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-[#393A32]">
                Table<span className="text-[#879779]">Mate</span>
              </span>
            </div>
            <p className="text-xs text-[#77786C] leading-relaxed">
              Warm hospitality, real-time table reservations, and relaxed dining moments crafted for friends and family.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#788B68] font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-[#788B68]" />
              <span>Verified Table Hospitality</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#393A32] mb-4">Explore</h4>
            <ul className="space-y-2.5 text-xs text-[#77786C]">
              <li>
                <Link to="/restaurants" className="hover:text-[#879779] transition">
                  Handpicked Dining
                </Link>
              </li>
              <li>
                <Link to="/reservation" className="hover:text-[#879779] transition">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link to="/reservations" className="hover:text-[#879779] transition">
                  My Reservations
                </Link>
              </li>
              <li>
                <Link to="/tables" className="hover:text-[#879779] transition">
                  Floorplan & Seating
                </Link>
              </li>
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#393A32] mb-4">Cuisines</h4>
            <ul className="space-y-2.5 text-xs text-[#77786C]">
              <li>Rustic French Kitchen & Bakery</li>
              <li>Zen Japanese Izakaya & Sushi</li>
              <li>Artisanal Tuscan Pasta & Hearth</li>
              <li>Fragrant Royal Spice Pavilion</li>
              <li>Coastal Catch & Pier Seafood</li>
            </ul>
          </div>

          {/* Hospitality & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#393A32] mb-4">Friendly Support</h4>
            <div className="space-y-3 text-xs text-[#77786C]">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#879779] mt-0.5 shrink-0" />
                <span>Instant confirmation & flexible adjustments anytime</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#879779] mt-0.5 shrink-0" />
                <span>Downtown, Midtown, West End, Uptown & Harbor Pier</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5DFD2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#77786C] gap-4">
          <p>© {new Date().getFullYear()} TableMate. Warm, peaceful dining made simple.</p>
          <div className="flex items-center gap-1.5">
            <span>Gathered with</span>
            <Heart className="w-3.5 h-3.5 text-[#C58F78] fill-[#C58F78] inline" />
            <span>for shared meals and moments.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
