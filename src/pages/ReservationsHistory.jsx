// src/pages/ReservationsHistory.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Utensils, MapPin, Trash2, Edit3, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useReservationContext } from '../context/ReservationContext';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import Input from '../components/common/Input';

export const ReservationsHistory = () => {
  const {
    reservationHistory,
    fetchReservationHistory,
    modifyReservation,
    cancelReservation,
    apiLoading,
    apiError
  } = useReservationContext();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', time: '', guests: 2, specialRequests: '' });
  const [actionSuccess, setActionSuccess] = useState('');

  useEffect(() => {
    fetchReservationHistory();
  }, [fetchReservationHistory]);

  const handleStartEdit = (res) => {
    setEditingId(res.id);
    setEditForm({
      date: res.date,
      time: res.time,
      guests: res.guests,
      specialRequests: res.specialRequests || ''
    });
    setActionSuccess('');
  };

  const handleSaveEdit = async (id) => {
    try {
      await modifyReservation(id, editForm);
      setEditingId(null);
      setActionSuccess(`Reservation #${id} modified successfully!`);
      setTimeout(() => setActionSuccess(''), 4000);
    } catch (err) {
      alert(`Update failed: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to cancel reservation #${id}? This will release the table.`)) {
      try {
        await cancelReservation(id);
        setActionSuccess(`Reservation #${id} has been cancelled successfully.`);
        setTimeout(() => setActionSuccess(''), 4000);
      } catch (err) {
        alert(`Cancel failed: ${err.message}`);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#879779]">
            Your Table Bookings
          </span>
          <h1 className="font-display text-3xl font-bold text-[#393A32]">
            My Reservations
          </h1>
          <p className="text-xs text-[#77786C] mt-0.5">
            Review your upcoming meals, make adjustments, or release bookings anytime.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={RefreshCw}
          onClick={() => fetchReservationHistory()}
          loading={apiLoading}
        >
          Refresh Bookings
        </Button>
      </div>

      {/* Success alert */}
      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-[#E8ECE4] border border-[#D2DCD0] text-xs font-semibold text-[#56664C] flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-[#788B68] shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* API Error state */}
      {apiError && (
        <div className="p-4 rounded-2xl bg-[#FAF3F0] border border-[#E7C8BE] text-xs text-[#9B5F48] flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#C58F78] shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      {/* Loading state */}
      {apiLoading && reservationHistory.length === 0 && (
        <Loading message="Fetching your table reservations..." />
      )}

      {/* Empty State */}
      {!apiLoading && reservationHistory.length === 0 && (
        <div className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] p-12 text-center max-w-md mx-auto shadow-cozy">
          <Utensils className="w-12 h-12 text-[#77786C] mx-auto mb-3" />
          <h3 className="font-display text-xl font-bold text-[#393A32]">No Active Bookings</h3>
          <p className="text-xs text-[#77786C] mt-1 mb-6">
            You currently have no active or past restaurant reservations on record.
          </p>
          <Button variant="primary" size="sm" onClick={() => (window.location.href = '/restaurants')}>
            Explore Welcoming Dining
          </Button>
        </div>
      )}

      {/* Reservations List */}
      <div className="space-y-6">
        {reservationHistory.map((res) => {
          const isEditing = editingId === res.id;

          return (
            <div
              key={res.id}
              className="bg-[#FFFDF7] rounded-3xl border border-[#E5DFD2] p-6 sm:p-8 shadow-cozy transition hover:border-[#879779]/60"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5DFD2]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#56664C] bg-[#E8ECE4] px-2.5 py-0.5 rounded-full border border-[#D2DCD0]">
                      Booking #{res.id}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F0] text-[#788B68] border border-[#E8DDC9]">
                      {res.status || 'Confirmed'}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#393A32]">
                    {res.restaurantName}
                  </h3>
                  <p className="text-xs text-[#77786C] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#879779]" />
                    <span>{res.location || 'Dining District'} • {res.cuisine}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {!isEditing ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Edit3}
                        onClick={() => handleStartEdit(res)}
                      >
                        Modify Details
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={Trash2}
                        onClick={() => handleDelete(res.id)}
                      >
                        Cancel Booking
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSaveEdit(res.id)}
                        loading={apiLoading}
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        Discard
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Editing Form vs Read Mode */}
              {isEditing ? (
                <div className="mt-6 pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#F7F4EC] p-5 rounded-2xl border border-[#E5DFD2]">
                  <Input
                    label="Modify Date"
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  />
                  <Input
                    label="Modify Time"
                    type="text"
                    value={editForm.time}
                    placeholder="e.g. 07:30 PM"
                    onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                  />
                  <Input
                    label="Modify Guests"
                    type="number"
                    min="1"
                    max="12"
                    value={editForm.guests}
                    onChange={(e) => setEditForm({ ...editForm, guests: Number(e.target.value) })}
                  />
                  <div className="sm:col-span-3">
                    <label className="text-xs font-semibold uppercase text-[#5E5F55] block mb-1">
                      Modify Special Requests
                    </label>
                    <input
                      type="text"
                      value={editForm.specialRequests}
                      onChange={(e) => setEditForm({ ...editForm, specialRequests: e.target.value })}
                      className="w-full rounded-xl border border-[#E5DFD2] px-3.5 py-2 text-sm bg-[#FFFDF7] text-[#393A32]"
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2]">
                    <span className="text-[#77786C] font-bold uppercase block text-[10px]">Date</span>
                    <p className="font-bold text-[#393A32] mt-0.5">{res.date}</p>
                  </div>
                  <div className="bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2]">
                    <span className="text-[#77786C] font-bold uppercase block text-[10px]">Time Slot</span>
                    <p className="font-bold text-[#393A32] mt-0.5">{res.time}</p>
                  </div>
                  <div className="bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2]">
                    <span className="text-[#77786C] font-bold uppercase block text-[10px]">Party Size</span>
                    <p className="font-bold text-[#393A32] mt-0.5">{res.guests} Guests</p>
                  </div>
                  <div className="bg-[#F7F4EC] p-3.5 rounded-2xl border border-[#E5DFD2]">
                    <span className="text-[#77786C] font-bold uppercase block text-[10px]">Table</span>
                    <p className="font-bold text-[#393A32] mt-0.5 truncate">{res.tableName || 'Window Table'}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReservationsHistory;
