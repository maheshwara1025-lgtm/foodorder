// src/pages/RestaurantDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Clock, Users, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import fetchWithAuth from '../services/api';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { useReservationContext } from '../context/ReservationContext';

export const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectRestaurant } = useReservationContext();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithAuth(`/api/restaurants/${id}`);
        setRestaurant(data);
      } catch (err) {
        setError(err.message || 'Restaurant not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  const handleStartBooking = () => {
    if (restaurant) {
      selectRestaurant(restaurant);
      navigate('/reservation/date-time');
    }
  };

  if (loading) {
    return <Loading fullScreen message="Loading restaurant details & peaceful ambiance..." />;
  }

  if (error || !restaurant) {
    return (
      <div className="max-w-lg mx-auto my-20 p-8 bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] text-center shadow-cozy">
        <AlertCircle className="w-10 h-10 text-[#C58F78] mx-auto mb-3" />
        <h2 className="font-display text-xl font-bold text-[#393A32] mb-2">Dining Space Not Found</h2>
        <p className="text-xs text-[#77786C] mb-6">{error || 'Requested restaurant ID does not exist.'}</p>
        <Link to="/restaurants">
          <Button variant="primary" size="md" icon={ArrowLeft}>
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <div>
        <Link
          to="/restaurants"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#77786C] hover:text-[#879779] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurant Directory</span>
        </Link>
      </div>

      {/* Hero Header: Soft, warm, natural banner */}
      <div className="relative rounded-3xl overflow-hidden bg-[#EFECE2] text-[#393A32] min-h-[400px] flex items-end shadow-cozy border border-[#E5DFD2]">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30 filter sepia-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F4EC] via-[#F7F4EC]/80 to-transparent" />

        <div className="relative z-10 p-8 sm:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#879779] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                {restaurant.cuisine}
              </span>
              <span className="bg-[#FFFDF7]/90 text-[#393A32] text-xs font-medium px-3 py-1 rounded-full border border-[#E5DFD2]">
                {restaurant.priceRange} Dining
              </span>
              <div className="flex items-center gap-1 bg-[#FFFDF7]/90 px-2.5 py-1 rounded-full text-xs font-bold text-[#393A32] border border-[#E5DFD2]">
                <Star className="w-3.5 h-3.5 fill-[#C58F78] text-[#C58F78]" />
                <span>{restaurant.rating}</span>
                <span className="text-[#77786C] font-normal">({restaurant.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#393A32]">{restaurant.name}</h1>
            <p className="text-base text-[#5E5F55] font-medium">{restaurant.tagline}</p>
            <p className="text-xs text-[#77786C] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#879779] shrink-0" />
              <span>{restaurant.address}</span>
            </p>
          </div>

          <div className="shrink-0">
            <Button variant="primary" size="lg" icon={ArrowRight} onClick={handleStartBooking}>
              Reserve a Table Here
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Details & Available Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Description & Features */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#FFFDF7] rounded-3xl p-8 border border-[#E5DFD2] shadow-cozy space-y-6">
            <h2 className="font-display text-2xl font-bold text-[#393A32]">About the Space</h2>
            <p className="text-sm text-[#5E5F55] leading-relaxed">{restaurant.description}</p>

            <div className="pt-6 border-t border-[#E5DFD2]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#77786C] mb-4">
                Hospitality & Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {restaurant.features?.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-2xl bg-[#F7F4EC] border border-[#E5DFD2] text-xs font-medium text-[#393A32]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#879779] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tables Overview */}
          <div className="bg-[#FFFDF7] rounded-3xl p-8 border border-[#E5DFD2] shadow-cozy space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-[#393A32]">Floorplan & Table Arrangements</h3>
              <span className="text-xs font-semibold text-[#56664C] bg-[#E8ECE4] px-3 py-1 rounded-full border border-[#D2DCD0]">
                {restaurant.tables?.length || 0} Tables Total
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {restaurant.tables?.map((tbl) => (
                <div
                  key={tbl.id}
                  className="p-3.5 rounded-2xl border border-[#E5DFD2] bg-[#F7F4EC] flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-[#393A32]">{tbl.name}</p>
                    <p className="text-[#77786C]">Area: {tbl.location} • Type: {tbl.type}</p>
                  </div>
                  <span className="font-semibold text-[#5E5F55] bg-[#FFFDF7] px-2.5 py-1 rounded-xl border border-[#E5DFD2]">
                    {tbl.capacity} Seats
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Reservation Sidebar info */}
        <div className="space-y-6">
          <div className="bg-[#FFFDF7] rounded-3xl p-6 border border-[#E5DFD2] shadow-cozy space-y-6">
            <h3 className="font-display text-lg font-bold text-[#393A32] pb-3 border-b border-[#E5DFD2]">
              Visiting Information
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#879779] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#393A32]">Operating Hours</p>
                  <p className="text-[#77786C]">{restaurant.openingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#879779] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#393A32]">Dining District</p>
                  <p className="text-[#77786C]">{restaurant.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#788B68] mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-[#393A32]">Table Assurance</p>
                  <p className="text-[#77786C]">Direct reservation via TableMate</p>
                </div>
              </div>
            </div>

            {/* Time Slots Preview */}
            <div className="pt-4 border-t border-[#E5DFD2]">
              <p className="text-xs font-bold uppercase tracking-wider text-[#77786C] mb-3">
                Available Time Slots Today
              </p>
              <div className="flex flex-wrap gap-2">
                {restaurant.availableTimeSlots?.slice(0, 6).map((slot, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#F7F4EC] text-[#393A32] px-2.5 py-1 rounded-xl border border-[#E5DFD2]"
                  >
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full mt-4" icon={ArrowRight} onClick={handleStartBooking}>
              Continue to Table Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
