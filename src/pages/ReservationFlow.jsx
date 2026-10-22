import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useReservationContext } from '../context/ReservationContext'
import { restaurants } from '../data/restaurants'
import { Button, Input } from '../components/UI'
import { TableSelection, ReservationSummary, Confirmation } from '../components/ReservationParts'

const steps = [
  { path: '/reservation/date-time', label: 'Date & time' },
  { path: '/reservation/table', label: 'Choose table' },
  { path: '/reservation/details', label: 'Your details' },
  { path: '/reservation/summary', label: 'Summary' }
]
function StepHeader({ current }) {
  return <div className="steps">{steps.map((s, i) => <div className={`step ${current >= i ? 'active' : ''}`} key={s.path}><span>{i + 1}</span><small>{s.label}</small></div>)}</div>
}
export function ReservationLayout() {
  const location = useLocation()
  const current = Math.max(0, steps.findIndex(s => s.path === location.pathname))
  return <section className="page-section narrow"><div className="page-intro"><p className="eyebrow">A FEW QUICK STEPS</p><h1>Let's make it a date.</h1><p>Everything you need for a lovely meal, all in one place.</p></div><StepHeader current={current}/><Outlet/></section>
}
export function DateTimeStep() {
  const r = useReservationContext()
  const navigate = useNavigate()
  const today = new Date().toISOString().slice(0,10)
  return <div className="form-panel"><h2>When are you joining us?</h2><p className="muted">Select your restaurant, date, time and party size.</p>
    <label className="field"><span>Restaurant *</span><select value={r.restaurant?.id || ''} onChange={e => r.selectRestaurant(restaurants.find(x => x.id === e.target.value) || null)}><option value="">Choose a restaurant</option>{restaurants.map(x => <option key={x.id} value={x.id}>{x.name} — {x.location}</option>)}</select></label>
    {r.restaurant && <><label className="field"><span>Date *</span><input type="date" min={today} value={r.date} onChange={e => r.updateDate(e.target.value)}/></label><label className="field"><span>Time *</span><select value={r.time} onChange={e => r.updateTime(e.target.value)}><option value="">Select a time slot</option>{r.restaurant.slots.map(t => <option key={t} value={t}>{t}</option>)}</select></label><label className="field"><span>Number of guests *</span><select value={r.guests} onChange={e => r.updateGuests(e.target.value)}>{Array.from({length:12},(_,i)=>i+1).map(n=><option key={n} value={n}>{n} {n===1?'guest':'guests'}</option>)}</select></label></>}
    {!r.restaurant && <p className="notice">Select a restaurant to see available time slots.</p>}
    <div className="form-actions"><Link to="/restaurants" className="text-link">Browse restaurants</Link><Button disabled={!r.restaurant || !r.date || !r.time} onClick={() => navigate('/reservation/table')}>Choose a table →</Button></div>
  </div>
}
export function TableStep() {
  const r = useReservationContext()
  const navigate = useNavigate()
  return <div className="form-panel"><h2>Find your perfect seat</h2><p className="muted">{r.restaurant ? `${r.restaurant.name} · ${r.date || 'Choose a date'} · ${r.time || 'Choose a time'}` : 'Choose a restaurant first.'}</p>
    {r.restaurant ? <><TableSelection/><div className="form-actions"><Button variant="outline" onClick={() => navigate('/reservation/date-time')}>← Back</Button><Button disabled={!r.table} onClick={() => navigate('/reservation/details')}>Guest details →</Button></div></> : <Button onClick={() => navigate('/reservation/date-time')}>Choose restaurant</Button>}
  </div>
}
export function DetailsStep() {
  const r = useReservationContext()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const update = (key, value) => r.setCustomer(old => ({...old, [key]: value}))
  const next = () => {
    if (!r.customer.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.customer.email) || !/^[0-9+\-\s]{7,15}$/.test(r.customer.phone)) { setError('Enter your name, a valid email and a phone number (7–15 digits).'); return }
    setError(''); navigate('/reservation/summary')
  }
  return <div className="form-panel"><h2>Who are we saving the table for?</h2><div className="two-col"><Input label="Full name *" value={r.customer.name} onChange={e=>update('name',e.target.value)} placeholder="Your name" required/><Input label="Email address *" type="email" value={r.customer.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com" required/></div><Input label="Phone number *" type="tel" value={r.customer.phone} onChange={e=>update('phone',e.target.value)} placeholder="+91 98765 43210" required/><label className="field"><span>Dietary preference</span><select value={r.dietary} onChange={e=>r.setDietary(e.target.value)}><option>No preference</option><option>Vegetarian</option><option>Vegan</option><option>Gluten-free</option><option>Jain</option><option>Other allergy / dietary needs</option></select></label><label className="field"><span>Special requests (optional)</span><textarea rows="3" maxLength="250" value={r.specialRequests} onChange={e=>r.setSpecialRequests(e.target.value)} placeholder="Celebration, high chair, accessibility needs…"/></label>{error && <p className="error-text">{error}</p>}<div className="form-actions"><Button variant="outline" onClick={()=>navigate('/reservation/table')}>← Back</Button><Button onClick={next}>Review reservation →</Button></div></div>
}
export function SummaryStep() {
  const r = useReservationContext()
  const navigate = useNavigate()
  const confirm = () => {
    if (!r.isComplete) return
    const saved = JSON.parse(localStorage.getItem('tablemate-bookings') || '[]')
    const booking = {...r.reservationDetails, createdAt: new Date().toISOString()}
    localStorage.setItem('tablemate-bookings', JSON.stringify([booking, ...saved]))
    navigate('/checkout')
  }
  return <div className="summary-layout"><div className="form-panel"><h2>One last look</h2><p className="muted">Check your details before confirming.</p><ReservationSummary onContinue={confirm}/><div className="form-actions"><Button variant="outline" onClick={()=>navigate('/reservation/details')}>← Edit details</Button></div></div></div>
}
export function Checkout() {
  const r = useReservationContext()
  return <section className="page-section narrow"><Confirmation reservation={r.reservationDetails}/><div className="center-actions"><Link className="button primary" to="/reservations">View my bookings</Link><Link className="button outline" to="/restaurants">Find another table</Link></div></section>
}
