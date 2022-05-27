import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getRestaurants } from '../features/restaurantSlice';

const SingleRestaurant = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector(state => state.restaurant);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({})
  
  const {
    r_id, r_name, cuisine, pricepoint, location, open, close, rating
  } = restaurant

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(getRestaurants())
    } else {
      setRestaurant(restaurants.find(r => r.r_id === id))
    }
  }, [restaurants])
  
  return (
    <main>
      <h1>{r_name}</h1>
      <h3>{location}</h3>
      <div>
        <p>Cuisines: {cuisine}</p>
        <p>Pricepoint: {pricepoint}</p>
        <p>Opening times: {open}-{close}</p>
      </div>
      <div>
        <Link to={`./edit`} state={{ r_id, r_name, cuisine, pricepoint, location, open, close, rating }}><button>Edit</button></Link>
      </div>

    </main>
  )
}

export default SingleRestaurant