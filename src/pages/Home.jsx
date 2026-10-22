// src/pages/Home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Utensils, Star, Calendar, ShieldCheck, Sparkles, ArrowRight, Compass, ChevronRight, Heart } from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';
import RestaurantCard from '../components/restaurant/RestaurantCard';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { useReservationContext } from '../context/ReservationContext';

export const Home = () => {
  const { restaurants, loading } = useRestaurants();
  const { selectRestaurant } = useReservationContext();
  const navigate = useNavigate();

  const handleQuickReserve = (restaurant) => {
    selectRestaurant(restaurant);
    navigate('/reservation/date-time');
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section: Warm, inviting, peaceful banner */}
      <section className="relative min-h-[500px] rounded-3xl overflow-hidden bg-[#EFECE2] text-[#393A32] flex items-center shadow-cozy mx-4 sm:mx-6 lg:mx-8 mt-6 border border-[#E5DFD2]">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=80"
            alt="Warm welcoming dining ambiance"
            className="w-full h-full object-cover opacity-20 filter sepia-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#F7F4EC] via-[#F7F4EC]/90 to-[#F7F4EC]/40" />
        </div>

        <div className="relative z-10 max-w-3xl px-8 sm:px-12 py-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DDC9]/70 border border-[#D9C8AC] text-[#393A32] text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#879779]" />
            <span>Thoughtfully Curated Dining Spaces</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#393A32] leading-tight">
            Find Your Place at the <span className="text-[#879779] italic">Table</span>.
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#77786C] max-w-xl leading-relaxed">
            Good food tastes better together. Reserve peaceful tables, choose your favorite seating, and take time for shared moments.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <Link to="/restaurants">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Explore Welcoming Places
              </Button>
            </Link>

            <Link to="/reservation">
              <Button
                variant="outline"
                size="lg"
                className="bg-[#FFFDF7] border-[#E5DFD2] text-[#393A32] hover:bg-[#EFECE2]"
              >
                Simple Table Hold
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-6 border-t border-[#E5DFD2] grid grid-cols-3 gap-6 text-[#77786C]">
            <div>
              <p className="text-2xl font-bold font-display text-[#393A32]">100%</p>
              <p className="text-xs">Quiet Table Assurance</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-[#879779]">4.9 ★</p>
              <p className="text-xs">Guest Warmth Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-[#C58F78]">Peaceful</p>
              <p className="text-xs">No Rushing or Queues</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Grid: Soft Ivory Cards with Warm Borders */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#879779] block mb-2">
            The TableMate Spirit
          </span>
          <h2 className="font-display text-3xl font-bold text-[#393A32]">
            Comfortable, Relaxed Dining
          </h2>
          <p className="text-sm text-[#77786C] mt-2">
            A serene reservation experience designed around warm hospitality and genuine care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] shadow-cozy hover:shadow-cozy-hover transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#E8ECE4] text-[#879779] flex items-center justify-center mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#393A32] mb-2">
              Naturally Sourced Kitchens
            </h3>
            <p className="text-xs text-[#77786C] leading-relaxed">
              Explore warm neighborhood bistros, cozy farm-to-table trattorias, and tranquil garden verandas.
            </p>
          </div>

          <div className="p-8 bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] shadow-cozy hover:shadow-cozy-hover transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#F4EEE1] text-[#B39972] flex items-center justify-center mb-6">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#393A32] mb-2">
              Pick Your Favorite Corner
            </h3>
            <p className="text-xs text-[#77786C] leading-relaxed">
              Choose peaceful window alcoves, garden terrace perches, or intimate booths suited for conversation.
            </p>
          </div>

          <div className="p-8 bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] shadow-cozy hover:shadow-cozy-hover transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#F4E4DF] text-[#C58F78] flex items-center justify-center mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#393A32] mb-2">
              Hassle-Free Hospitality
            </h3>
            <p className="text-xs text-[#77786C] leading-relaxed">
              Instant confirmations, simple re-scheduling, and respectful dietary preferences honoring your party.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Dining Experiences */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#879779] block mb-1">
              Handpicked Gatherings
            </span>
            <h2 className="font-display text-3xl font-bold text-[#393A32]">
              Places Worth a Visit
            </h2>
          </div>
          <Link
            to="/restaurants"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#879779] hover:text-[#6F8164]"
          >
            <span>Explore All Places</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <Loading message="Fetching welcoming dining tables..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.slice(0, 3).map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onQuickSelect={handleQuickReserve}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
