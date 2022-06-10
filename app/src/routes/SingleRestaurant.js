import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDishes, deleteDish,resetSuccess as dishResetSuccess } from '../features/dishSlice';
import { getRestaurants,deleteRestaurant, resetSuccess } from '../features/restaurantSlice';

const SingleRestaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    success: { APIsuccess, successType },
    restaurants } = useSelector(state => state.restaurant);
  const { dishes,
  success: {APIsuccess:DishSuccess, successType: DishSuccessType}} = useSelector(state => state.dish);
  const { user:{email} } = useSelector(state => state.user);
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  
  const {
    r_id, r_name, cuisine, pricepoint, location, open, close, rating, owner
  } = restaurant;

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(getRestaurants())
    } else {
      setRestaurant(restaurants.find(r => r.r_id === id))
    }
  }, [restaurants])

  useEffect(() => {
    if (restaurant) {
      setIsOwner(owner === email)
    }
  }, [restaurant])

  useEffect(() => {
      dispatch(getDishes(id))
  }, [])
  
  // Success actions
  useEffect(() => {
    if (APIsuccess) {
      if (successType === 'DELETE_RESTAURANT') {
        dispatch(resetSuccess())
        navigate('/restaurants')
      }
    } if (DishSuccess) {
      if (successType === 'DELETE_DISH') {
        dispatch(dishResetSuccess())
      }
    }
  }, [APIsuccess,DishSuccess])
  
  return (
    <main>
      <h1>{r_name} </h1>
      {isOwner&&<span>You own this restaurant</span>}
      <h3>{location}</h3>
      <div>
        <p>Cuisines: {cuisine}</p>
        <p>Pricepoint: {pricepoint}</p>
        <p>Opening times: {open}-{close}</p>
      </div>
      {/* Show edit/delete buttons only if owner */}
      {isOwner&&
        <div>
        <Link to={`./edit`}><button>Edit</button></Link>
        <Link to={`./new_dish`}><button>New Dish</button></Link>
        <button onClick={()=>dispatch(deleteRestaurant(r_id))}>Delete</button>
        </div>}
      
      <h2>Dishes</h2>
      {dishes.map(dish => {
        const { d_id, name, price, image, available, starred, category } = dish;
        return <article key={d_id}>
          <h4>{name}</h4>
          <p>{price} - {available ? 'Available' : 'Not available'}</p>
          <div>
            <button>Add to basket (NOT FUNCTIONAL)</button>
            {/* Show edit/delete buttons only if owner */}
            {isOwner &&<>
            <Link to={`../../dishes/${d_id}/edit`}><button>Edit</button></Link>
              <button onClick={() => { dispatch(deleteDish({ d_id, r_id })) }}>Delete</button>
            </>}
            </div>
        </article>
      })}

    </main>
  )
}

export default SingleRestaurant