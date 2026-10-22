import React from 'react'

export function Button({ children, variant = 'primary', ...props }) {
  return <button className={`button ${variant}`} {...props}>{children}</button>
}
export function Input({ label, ...props }) {
  return <label className="field"><span>{label}</span><input {...props} /></label>
}
export function Loading({ text = 'Loading restaurants…' }) {
  return <div className="loading"><span className="spinner" />{text}</div>
}
export function SearchBar({ value, onChange, inputRef }) {
  return <label className="search-box"><span>⌕</span><input ref={inputRef} value={value} onChange={e => onChange(e.target.value)} placeholder="Search restaurant, cuisine or city…" aria-label="Search restaurants" /></label>
}
export function FilterPanel({ location, setLocation, cuisine, setCuisine, minimumRating, setMinimumRating }) {
  return <div className="filters">
    <label>Location<select value={location} onChange={e => setLocation(e.target.value)}><option>All locations</option><option>Chennai</option><option>Coimbatore</option><option>Bengaluru</option></select></label>
    <label>Cuisine<select value={cuisine} onChange={e => setCuisine(e.target.value)}><option>All cuisines</option><option>Mediterranean</option><option>South Indian</option><option>Grill & BBQ</option><option>Cafe</option></select></label>
    <label>Minimum rating<select value={minimumRating} onChange={e => setMinimumRating(e.target.value)}><option value="0">Any rating</option><option value="4.5">4.5+ stars</option><option value="4.7">4.7+ stars</option></select></label>
  </div>
}
