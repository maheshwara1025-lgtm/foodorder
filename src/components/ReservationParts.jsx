import { useReservationContext } from '../context/ReservationContext'
import { Button } from './UI'

export function TableSelection() {
  const { availableTables, table, selectTable, guests } = useReservationContext()
  if (!availableTables.length) return <p className="notice">No tables available for {guests} guest(s). Try reducing the guest count or choose another restaurant.</p>
  return <div className="table-grid">{availableTables.map(item => <button key={item.id} className={`table-card ${table?.id === item.id ? 'selected' : ''}`} onClick={() => selectTable(item)}><span className="table-icon">▦</span><strong>Table {item.id}</strong><span>{item.type}</span><small>Seats up to {item.seats}</small></button>)}</div>
}
export function ReservationSummary({ onContinue }) {
  const { reservationDetails: r, seatingCapacity, isComplete } = useReservationContext()
  return <div className="summary-card"><h3>Your reservation</h3>
    <div className="summary-line"><span>Restaurant</span><strong>{r.restaurant?.name || 'Not selected'}</strong></div>
    <div className="summary-line"><span>Date</span><strong>{r.date || 'Not selected'}</strong></div>
    <div className="summary-line"><span>Time</span><strong>{r.time || 'Not selected'}</strong></div>
    <div className="summary-line"><span>Guests</span><strong>{r.guests}</strong></div>
    <div className="summary-line"><span>Table</span><strong>{r.table ? `${r.table.id} · ${seatingCapacity} seats` : 'Not selected'}</strong></div>
    <div className="summary-line"><span>Dietary</span><strong>{r.dietary}</strong></div>
    {r.specialRequests && <div className="summary-line"><span>Request</span><strong>{r.specialRequests}</strong></div>}
    {onContinue && <Button block onClick={onContinue} disabled={!isComplete}>Continue to confirmation</Button>}
    {!isComplete && <p className="small-note">Reservation details are incomplete. Choose a restaurant, date, time and table, then enter your contact details.</p>}
  </div>
}
export function Confirmation({ reservation }) {
  return <section className="confirmation"><div className="success-icon">✓</div><p className="eyebrow">BOOKING REQUEST RECEIVED</p><h1>You're all set!</h1><p>Your table at <strong>{reservation.restaurant?.name}</strong> is saved in this browser.</p><div className="confirm-details"><p><span>Booking reference</span><strong>TM-{Date.now().toString().slice(-6)}</strong></p><p><span>Date & time</span><strong>{reservation.date} · {reservation.time}</strong></p><p><span>Guests / table</span><strong>{reservation.guests} guests · {reservation.table?.id}</strong></p></div></section>
}
