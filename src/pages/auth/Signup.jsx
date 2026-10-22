// src/pages/auth/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User, Phone, Utensils, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading, authError, setAuthError } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Mobile phone number is required.';
    } else if (formData.phone.length < 8) {
      errs.phone = 'Please provide a valid telephone number.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!validate()) return;

    const res = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password
    });

    if (res.success) {
      navigate('/login', {
        state: {
          successMessage: 'Account created successfully. Please sign in.',
          prefilledEmail: formData.email
        }
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] shadow-cozy p-8 sm:p-10 space-y-7">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-[#879779] rounded-2xl shadow-sm flex items-center justify-center text-white">
            <Utensils className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#393A32]">
            Join Our Table
          </h1>
          <p className="text-xs text-[#77786C]">
            Create a profile to book tables, save dietary preferences, and track reservations.
          </p>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="p-3.5 bg-[#FAF3F0] border border-[#E7C8BE] rounded-2xl text-xs text-[#9B5F48] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C58F78] shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            icon={User}
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Charlotte Dubois"
            error={formErrors.name}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              name="email"
              type="email"
              icon={Mail}
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="charlotte@domain.com"
              error={formErrors.email}
            />

            <Input
              label="Mobile Phone"
              name="phone"
              type="tel"
              icon={Phone}
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 987-6543"
              error={formErrors.phone}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              name="password"
              type="password"
              icon={Lock}
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              error={formErrors.password}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              icon={Lock}
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="••••••••"
              error={formErrors.confirmPassword}
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-full mt-4"
            loading={loading}
            icon={ArrowRight}
          >
            Create My Account
          </Button>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E5DFD2] text-center space-y-3">
          <p className="text-xs text-[#77786C]">
            Already have an active account?{' '}
            <Link to="/login" className="font-bold text-[#879779] hover:text-[#6F8164]">
              Sign In here
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#77786C]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#788B68]" />
            <span>Secure & Thoughtful Dining Community</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
