// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Lock, Utensils } from 'lucide-react';
import { useReservationContext } from '../context/ReservationContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ReservationSummary from '../components/reservation/ReservationSummary';

export const Checkout = () => {
  const navigate = useNavigate();
  const { reservationDetailsSummary, createReservation, apiLoading, apiError } = useReservationContext();

  const [paymentMethod, setPaymentMethod] = useState('table_hold'); // table_hold or card
  const [billingError, setBillingError] = useState('');

  const handleFinalize = async (e) => {
    e.preventDefault();
    setBillingError('');
    try {
      const created = await createReservation();
      navigate('/confirmation', { state: { reservation: created } });
    } catch (err) {
      setBillingError(err.message || 'Payment hold failed.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
          Guaranteed Table Hold
        </span>
        <h1 className="font-display text-3xl font-bold text-brand-900">
          Reservation Checkout & Guarantee
        </h1>
        <p className="text-xs text-brand-500 mt-1">
          Lock in your preferred table and confirm your attendance without upfront cancellation charges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Summary */}
        <div className="lg:col-span-2 space-y-6">
          <ReservationSummary summary={reservationDetailsSummary} />
        </div>

        {/* Right: Payment Hold Selection */}
        <div className="bg-white rounded-3xl p-6 border border-brand-200/90 shadow-luxury space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-brand-900 pb-3 border-b border-brand-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-gold-600" />
              <span>Table Hold Guarantee</span>
            </h3>

            <div className="p-4 rounded-2xl bg-gold-50/80 border border-gold-200 text-xs text-brand-800 space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span>Hold Fee:</span>
                <span className="text-emerald-700">$0.00 (Complimentary)</span>
              </div>
              <p className="text-[11px] text-brand-500 leading-relaxed">
                Your card is only reserved to honor the chef’s table. No charge is made when dining.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-brand-600 block">
                Billing Method
              </label>
              <div
                onClick={() => setPaymentMethod('table_hold')}
                className={`p-3 rounded-xl border-2 cursor-pointer transition text-xs font-semibold flex items-center justify-between ${
                  paymentMethod === 'table_hold'
                    ? 'border-gold-500 bg-gold-50/60 text-brand-950'
                    : 'border-brand-200 bg-white text-brand-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-gold-600" />
                  <span>Instant Table Guarantee (Free)</span>
                </div>
                {paymentMethod === 'table_hold' && (
                  <CheckCircle2 className="w-4 h-4 text-gold-600" />
                )}
              </div>
            </div>

            {billingError && (
              <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {billingError}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-brand-100 space-y-3">
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              loading={apiLoading}
              onClick={handleFinalize}
              icon={ArrowRight}
            >
              Authorize & Confirm
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>PCI-DSS Secured Reservation Protocol</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
