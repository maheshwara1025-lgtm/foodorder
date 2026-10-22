// src/pages/reservation/DetailsStep.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, User, Mail, Phone, Heart, FileText, CheckCircle2 } from 'lucide-react';
import { useReservationContext } from '../../context/ReservationContext';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export const DetailsStep = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    customerInfo,
    updateCustomerInfo,
    specialRequests,
    updateSpecialRequests,
    dietaryPreferences,
    updateDietaryPreferences
  } = useReservationContext();

  const [form, setForm] = useState({
    fullName: customerInfo.fullName || user?.name || '',
    email: customerInfo.email || user?.email || '',
    phone: customerInfo.phone || user?.phone || '',
    occasion: customerInfo.occasion || 'Dinner'
  });

  const [dietary, setDietary] = useState(dietaryPreferences || 'None');
  const [requests, setRequests] = useState(specialRequests || '');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }
    if (!form.phone.trim()) {
      errs.phone = 'Contact phone number is required.';
    } else if (form.phone.trim().length < 7) {
      errs.phone = 'Please enter a valid phone number with area code.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateCustomerInfo(form);
    updateDietaryPreferences(dietary);
    updateSpecialRequests(requests);

    navigate('/reservation/summary');
  };

  const dietaryOptions = [
    'None',
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Kosher',
    'Nut Allergy',
    'Shellfish Allergy'
  ];

  return (
    <form onSubmit={handleNext} className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h3 className="font-display text-2xl font-bold text-[#393A32]">Guest Details & Dining Requests</h3>
        <p className="text-xs text-[#77786C] mt-1">
          Provide lead patron details and bespoke requests for our kitchen and floor staff.
        </p>
      </div>

      {/* Guest Contact Information Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Input
          label="Lead Guest Name"
          name="fullName"
          icon={User}
          required
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          placeholder="e.g. Alexander Wright"
          error={errors.fullName}
        />

        <Input
          label="Contact Email Address"
          name="email"
          type="email"
          icon={Mail}
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="e.g. alex@example.com"
          error={errors.email}
        />

        <Input
          label="Contact Phone"
          name="phone"
          type="tel"
          icon={Phone}
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="e.g. +1 (555) 019-2834"
          error={errors.phone}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55]">
            Dining Occasion
          </label>
          <select
            value={form.occasion}
            onChange={(e) => setForm({ ...form, occasion: e.target.value })}
            className="w-full rounded-xl border border-[#E5DFD2] bg-[#FFFDF7] text-[#393A32] px-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#879779]/20 focus:border-[#879779]"
          >
            <option value="Dinner">Dinner / Social Gathering</option>
            <option value="Anniversary">Anniversary Celebration</option>
            <option value="Birthday">Birthday</option>
            <option value="Business Meeting">Comfortable Meeting</option>
            <option value="Romantic Date">Quiet Evening Date</option>
          </select>
        </div>
      </div>

      {/* Dietary Preferences */}
      <div className="space-y-3 pt-4 border-t border-[#E5DFD2]">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55] flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-[#879779]" />
          <span>Dietary Needs & Allergies</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {dietaryOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setDietary(opt)}
              className={`p-2.5 rounded-2xl text-xs font-medium border text-left transition flex items-center justify-between ${
                dietary === opt
                  ? 'bg-[#E8ECE4] border-[#879779] text-[#393A32] ring-1 ring-[#879779]'
                  : 'bg-[#FFFDF7] border-[#E5DFD2] text-[#5E5F55] hover:bg-[#F7F4EC]'
              }`}
            >
              <span>{opt}</span>
              {dietary === opt && <CheckCircle2 className="w-4 h-4 text-[#879779]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#5E5F55] flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-[#879779]" />
          <span>Special Requests (Optional)</span>
        </label>
        <textarea
          rows={3}
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
          placeholder="Quiet corner table, peaceful seating, high chair needed, etc."
          className="w-full rounded-2xl border border-[#E5DFD2] bg-[#FFFDF7] text-[#393A32] p-3.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#879779]/20 focus:border-[#879779]"
        />
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-[#E5DFD2] flex items-center justify-between">
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => navigate('/reservation/table')}
        >
          Previous: Tables
        </Button>

        <Button variant="primary" size="lg" type="submit" icon={ArrowRight}>
          Review Reservation Summary
        </Button>
      </div>
    </form>
  );
};

export default DetailsStep;
