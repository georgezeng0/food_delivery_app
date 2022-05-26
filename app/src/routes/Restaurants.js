import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurants,deleteRestaurant } from '../features/restaurantSlice'

const Restaurants = () => {
  const { restaurants } = useSelector(state => state.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants());
  },[])

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
            <button onClick={()=>dispatch(deleteRestaurant(r_id))}>Delete</button>
          </article>
        })}
      </section>
    </main>
  )
}

export default Restaurants