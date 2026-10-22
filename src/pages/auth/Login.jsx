// src/pages/auth/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Utensils, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, authError, setAuthError } = useAuth();

  // Redirect destination after login
  const from = location.state?.from?.pathname || '/reservation/date-time';
  const successMessage = location.state?.successMessage;
  const prefilledEmail = location.state?.prefilledEmail || 'alex@example.com';

  const [email, setEmail] = useState(prefilledEmail);
  const [password, setPassword] = useState('password123');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (location.state?.prefilledEmail) {
      setEmail(location.state.prefilledEmail);
      setPassword(''); // User manually inputs password after signup
    }
  }, [location.state]);

  const validate = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email address or username is required.';
    } else if (!email.includes('@') && email.length < 3) {
      errors.email = 'Please provide a valid email or patron username.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!validate()) return;

    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  const handleDemoFill = () => {
    setEmail('alex@example.com');
    setPassword('password123');
    setFormErrors({});
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] shadow-cozy p-8 sm:p-10 space-y-7">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto bg-[#879779] rounded-2xl shadow-sm flex items-center justify-center text-white">
            <Utensils className="w-6 h-6" />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#393A32]">
            Welcome Back
          </h1>
          <p className="text-xs text-[#77786C]">
            Sign in to access your table holds, preferences, and bookings.
          </p>
        </div>

        {/* Success Alert Banner from Signup Redirection */}
        {successMessage && (
          <div className="p-3.5 bg-[#E8ECE4] border border-[#D2DCD0] rounded-2xl text-xs font-semibold text-[#56664C] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#788B68] shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Demo Credentials Helper */}
        <div className="p-3.5 bg-[#F7F4EC] rounded-2xl border border-[#E5DFD2] text-xs text-[#5E5F55] flex items-center justify-between">
          <div>
            <p className="font-bold text-[#393A32]">Demo Patron Account:</p>
            <p className="text-[#77786C]">alex@example.com / password123</p>
          </div>
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-[11px] font-semibold text-[#56664C] hover:text-[#393A32] bg-[#E8ECE4] px-2.5 py-1 rounded-lg transition"
          >
            Auto Fill
          </button>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="p-3.5 bg-[#FAF3F0] border border-[#E7C8BE] rounded-2xl text-xs text-[#9B5F48] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C58F78] shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email or Username"
            name="email"
            type="text"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="patron@domain.com"
            error={formErrors.email}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            error={formErrors.password}
            required
          />

          <Button
            variant="primary"
            size="lg"
            type="submit"
            className="w-full mt-2"
            loading={loading}
            icon={ArrowRight}
          >
            Sign In to Reserve
          </Button>
        </form>

        {/* Footer info */}
        <div className="pt-4 border-t border-[#E5DFD2] text-center space-y-3">
          <p className="text-xs text-[#77786C]">
            New to TableMate?{' '}
            <Link to="/signup" className="font-bold text-[#879779] hover:text-[#6F8164]">
              Create an account
            </Link>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#77786C]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#788B68]" />
            <span>Secure & Private Session Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
