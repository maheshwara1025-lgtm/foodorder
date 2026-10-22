import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function MyReservations() {
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    try { setBookings(JSON.parse(localStorage.getItem('tablemate-bookings') || '[]')) } catch { setBookings([]) }
  }, [])
  return <section className="page-section"><div className="page-intro"><p className="eyebrow">YOUR PLANS</p><h1>My bookings</h1><p>Your saved reservation details are listed here on this browser.</p></div>{!bookings.length ? <div className="empty-state"><span>♡</span><h3>No bookings yet</h3><p>Find a restaurant and save your first table.</p><Link className="button primary" to="/restaurants">Explore restaurants</Link></div> : <div className="booking-list">{bookings.map((b,i)=><article className="booking-card" key={b.createdAt || i}><div className="booking-icon">{b.restaurant?.image || '🍽️'}</div><div><h3>{b.restaurant?.name || 'Restaurant'}</h3><p>{b.restaurant?.location} · {b.restaurant?.cuisine}</p><p><strong>{b.date}</strong> at <strong>{b.time}</strong> · {b.guests} guests · Table {b.table?.id}</p><small>{b.customer?.name} · {b.customer?.email}</small></div><span className="status-pill">Saved</span></article>)}</div>}</section>
}
