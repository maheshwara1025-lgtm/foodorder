// src/components/restaurant/RestaurantCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

export const RestaurantCard = ({ restaurant, onQuickSelect }) => {
  return (
    <div className="group bg-[#FFFDF7] rounded-3xl overflow-hidden border border-[#E5DFD2] shadow-cozy hover:shadow-cozy-hover transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Image & Badges */}
      <div className="relative h-52 overflow-hidden bg-[#EFECE2]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter saturate-[0.95]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#393A32]/60 via-transparent to-black/10" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="bg-[#FFFDF7]/90 backdrop-blur-md text-[#393A32] text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#E5DFD2]">
            {restaurant.cuisine}
          </span>
          <span className="bg-[#FFFDF7]/90 backdrop-blur-md text-[#77786C] text-xs font-medium px-2.5 py-1 rounded-lg border border-[#E5DFD2]">
            {restaurant.priceRange}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3.5 right-3.5 bg-[#FFFDF7]/95 backdrop-blur-md border border-[#E5DFD2] text-[#393A32] text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-[#C58F78] text-[#C58F78]" />
          <span>{restaurant.rating}</span>
          <span className="text-[#77786C] font-normal">({restaurant.reviewsCount})</span>
        </div>

        {/* Bottom overlay info */}
        <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
          <p className="text-xs text-[#FAF7F0] font-medium tracking-wide flex items-center gap-1 drop-shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#E8DDC9]" />
            <span>{restaurant.location}</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-[#393A32] group-hover:text-[#879779] transition-colors">
            {restaurant.name}
          </h3>
          <p className="text-xs text-[#77786C] font-medium mt-0.5 line-clamp-1">
            {restaurant.tagline}
          </p>
          <p className="text-xs text-[#5E5F55] mt-3 line-clamp-2 leading-relaxed">
            {restaurant.description}
          </p>

          {/* Quick meta */}
          <div className="mt-4 pt-4 border-t border-[#E5DFD2] flex items-center justify-between text-xs text-[#77786C]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#879779]" />
              <span>{restaurant.openingHours}</span>
            </span>
            <span className="flex items-center gap-1 text-[#788B68] font-medium">
              <Users className="w-3.5 h-3.5" />
              <span>{restaurant.tables?.length || 6} Tables</span>
            </span>
          </div>

          {/* Features pills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {restaurant.features?.slice(0, 2).map((feat, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-[#F7F4EC] text-[#5E5F55] px-2 py-0.5 rounded-md border border-[#E5DFD2]"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 pt-3 grid grid-cols-2 gap-2">
          <Link to={`/restaurant/${restaurant.id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full text-xs">
              View Details
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            className="w-full text-xs"
            icon={ArrowRight}
            onClick={() => onQuickSelect ? onQuickSelect(restaurant) : null}
          >
            Reserve Table
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
