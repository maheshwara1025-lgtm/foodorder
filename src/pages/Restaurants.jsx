import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import useRestaurants from '../hooks/useRestaurants'
import { useReservationContext } from '../context/ReservationContext'
import RestaurantCard from '../components/RestaurantCard'
import { FilterPanel, Loading, SearchBar } from '../components/UI'

export default function Restaurants() {
  const data = useRestaurants()
  const searchRef = useRef(null)
  const navigate = useNavigate()
  const { selectRestaurant } = useReservationContext()
  const choose = (restaurant) => { selectRestaurant(restaurant); navigate(`/restaurant/${restaurant.id}`) }
  return <section className="page-section"><div className="page-intro"><p className="eyebrow">FIND YOUR TABLE</p><h1>Restaurants for every mood.</h1><p>Search by name, city or cuisine, then choose the table that fits your plans.</p></div>
    <div className="search-toolbar"><SearchBar value={data.search} onChange={data.setSearch} inputRef={searchRef}/><button className="button outline" onClick={() => searchRef.current?.focus()}>Focus search</button></div>
    <FilterPanel {...data}/>
    <div className="results-heading"><strong>{data.filteredRestaurants.length} places to explore</strong><span>Sorted by guest rating</span></div>
    {data.loading ? <Loading/> : data.filteredRestaurants.length ? <div className="restaurant-grid">{data.filteredRestaurants.map(r => <RestaurantCard key={r.id} restaurant={r} onSelect={choose}/>)}</div> : <div className="empty-state"><span>⌕</span><h3>No restaurants found</h3><p>Try a different search term or clear your filters.</p><button className="button outline" onClick={() => { data.setSearch(''); data.setLocation('All locations'); data.setCuisine('All cuisines'); data.setMinimumRating('0') }}>Clear filters</button></div>}
  </section>
}
