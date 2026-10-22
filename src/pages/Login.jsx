import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button, Input } from '../components/UI'

export default function Login() {
  const [email, setEmail] = useState('student@example.com')
  const [password, setPassword] = useState('Table123')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const submit = e => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Enter a valid email address.')
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) return setError('Password must be at least 8 characters and include an uppercase letter and a number.')
    login(email)
    navigate(location.state?.from?.pathname || '/restaurants', { replace: true })
  }
  return <section className="login-page"><div className="login-art"><div className="hero-plate">🍽️</div><p className="eyebrow">YOUR PLACE AT THE TABLE</p><h2>Good evenings<br/>start with a plan.</h2><p>Sign in to keep your dining plans together.</p></div><form className="login-form" onSubmit={submit}><p className="eyebrow">WELCOME BACK</p><h1>Let's get you seated.</h1><p className="muted">Sign in to continue to your reservation.</p><Input label="Email address" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/><Input label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/><small className="demo-hint">Demo: student@example.com / Table123</small>{error && <p className="error-text">{error}</p>}<Button block type="submit">Log in ↗</Button><p className="login-bottom">New here? <Link to="/restaurants">Explore restaurants</Link></p></form></section>
}
