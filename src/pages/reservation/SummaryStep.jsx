// src/pages/reservation/SummaryStep.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useReservationContext } from '../../context/ReservationContext';
import ReservationSummary from '../../components/reservation/ReservationSummary';
import Button from '../../components/common/Button';

export const SummaryStep = () => {
  const navigate = useNavigate();
  const {
    reservationDetailsSummary,
    createReservation,
    clearReservation,
    apiLoading,
    apiError
  } = useReservationContext();

  const [submitError, setSubmitError] = useState(null);

  const handleConfirmReservation = async () => {
    setSubmitError(null);
    try {
      const created = await createReservation();
      navigate('/confirmation', { state: { reservation: created } });
    } catch (err) {
      setSubmitError(err.message || 'Unable to confirm reservation via API');
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h3 className="font-display text-2xl font-bold text-[#393A32]">
          Review & Confirm Reservation
        </h3>
        <p className="text-xs text-[#77786C] mt-1">
          Verify your table allocation, party specifications, and contact details before final locking.
        </p>
      </div>

      {/* Reservation Summary Card */}
      <ReservationSummary summary={reservationDetailsSummary} />

      {/* Conditional rendering for incomplete details */}
      {!reservationDetailsSummary.isComplete && (
        <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8DDC9] text-xs text-[#B39972] flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#B39972] shrink-0" />
          <span>
            Reservation details are incomplete. Please complete all prior steps (space, date/time, table, and patron contact).
          </span>
        </div>
      )}

      {/* Error state */}
      {(submitError || apiError) && (
        <div className="p-4 rounded-2xl bg-[#FAF3F0] border border-[#E7C8BE] text-xs text-[#9B5F48] flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#C58F78] shrink-0" />
          <span>{submitError || apiError}</span>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-6 border-t border-[#E5DFD2] flex items-center justify-between">
        <Button
          variant="outline"
          size="md"
          icon={ArrowLeft}
          onClick={() => navigate('/reservation/details')}
        >
          Modify Guest Details
        </Button>

        <Button
          variant="primary"
          size="lg"
          icon={CheckCircle}
          loading={apiLoading}
          disabled={!reservationDetailsSummary.isComplete || apiLoading}
          onClick={handleConfirmReservation}
        >
          Confirm Reservation
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
