import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurants } from '../features/restaurantSlice'

const Restaurants = () => {
  const { restaurants } = useSelector(state => state.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants());
  },[dispatch])

  return (
    <main>
      <h1>All restaurants</h1>
      <div>
        <Link to='/restaurants/create'>Create Restaurant</Link>
      </div>
      <section>
        {restaurants.map(r => {
          const { r_id, r_name, location } = r
          return <article key={r_id}>
            <h3>{r_name} - {location}</h3>
            <Link to={`/restaurants/${r_id}`}><button>View</button></Link>
          </article>
        })}
      </section>
    </main>
  )
}

export default Restaurants