import { Link } from 'react-router-dom'
import { Button } from './UI'

export default function RestaurantCard({ restaurant, onSelect }) {
  return <article className="restaurant-card">
    <div className="restaurant-art"><span>{restaurant.image}</span><small>{restaurant.price}</small></div>
    <div className="restaurant-content">
      <div className="card-title-row"><h3>{restaurant.name}</h3><span className="rating">★ {restaurant.rating}</span></div>
      <p className="muted">{restaurant.cuisine} · {restaurant.location}</p>
      <p>{restaurant.description}</p>
      <div className="card-actions"><Link className="text-link" to={`/restaurant/${restaurant.id}`}>View details ↗</Link><Button onClick={() => onSelect?.(restaurant)}>Reserve</Button></div>
    </div>
  </article>
}
