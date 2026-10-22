import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from './UI'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  return <header className="header"><Link to="/" className="brand"><span className="brand-mark">T</span><span>tablemate<small>GOOD FOOD. GREAT MOMENTS.</small></span></Link>
    <nav><NavLink to="/">Home</NavLink><NavLink to="/restaurants">Restaurants</NavLink><NavLink to="/reservations">My bookings</NavLink></nav>
    {user ? <div className="header-user"><span className="user-email">{user.email}</span><Button variant="outline" onClick={() => { logout(); navigate('/') }}>Log out</Button></div> : <Link to="/login" className="login-link">Log in ↗</Link>}
  </header>
}
export function Footer() {
  return <footer className="footer"><div className="brand footer-brand"><span className="brand-mark">T</span><span>tablemate<small>MAKE ROOM FOR GOOD TIMES.</small></span></div><p>Discover a table worth gathering around.</p><small>© 2026 TableMate · React learning project</small></footer>
}
export default function Layout() {
  return <><Header /><main className="main"><Outlet /></main><Footer /></>
}
