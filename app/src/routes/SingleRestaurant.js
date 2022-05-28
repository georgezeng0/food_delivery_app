import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getDishes, deleteDish } from '../features/dishSlice';
import { getRestaurants } from '../features/restaurantSlice';

const SingleRestaurant = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector(state => state.restaurant);
  const { dishes } = useSelector(state => state.dish);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  
  const {
    r_id, r_name, cuisine, pricepoint, location, open, close, rating
  } = restaurant;

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(getRestaurants())
    } else {
      setRestaurant(restaurants.find(r => r.r_id === id))
    }
  }, [restaurants])

  useEffect(() => {
      dispatch(getDishes(id))
  },[])
  
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
        <Link to={`./edit`}><button>Edit</button></Link>
        <Link to={`./new_dish`}><button>New Dish</button></Link>
      </div>
      <h2>Dishes</h2>
      {dishes.map(dish => {
        const { d_id, name, price, image, available, starred, category } = dish;
        return <article key={d_id}>
          <h4>{name}</h4>
          <p>{price} - {available ? 'Available' : 'Not available'}</p>
          <div>
            <button>Add to basket (NOT FUNCTIONAL)</button>
            <Link to={`../../dishes/${d_id}/edit`}><button>Edit</button></Link>
            <button onClick={()=>{dispatch(deleteDish(d_id))}}>Delete</button>
          </div>
        </article>
      })}

    </main>
  )
}

export default SingleRestaurant