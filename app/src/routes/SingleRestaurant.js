import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDishes, deleteDish,resetSuccess as dishResetSuccess } from '../features/dishSlice';
import { getRestaurants, deleteRestaurant, resetSuccess } from '../features/restaurantSlice';
import {Loading, ReviewForm, Reviews} from '../components'
import { toast } from 'react-toastify';
import Error from './Error';
import { addItem, resetError } from '../features/basketSlice';

const SingleRestaurant = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    error: {isError, message},
    success: { APIsuccess, successType },
    restaurants } = useSelector(state => state.restaurant);
  const { dishes,
    isLoading: dishLoading,
    error: {isError:dishError, message:dishErrorMessage},
  success: {APIsuccess:DishSuccess, successType: DishSuccessType}} = useSelector(state => state.dish);
  const { user:{email} } = useSelector(state => state.user);
  const { avg_rating } = useSelector(state => state.review);
  const {error: {isError:basketError, type:basketErrorType}} = useSelector(state=>state.basket)
  const { r_id:id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  
  const {
    r_id, r_name, cuisine, pricepoint, location, open, close, owner, image
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

 // If adding to basket with dishes from another restaurant
  useEffect(() => {
    if (basketError && basketErrorType === "DIFF_RESTAURANT") {
      // Should upgrade this to a modal with option to empty basket or goto that restaurant.
      toast.error('You already have a basket from another restaurant!')
      dispatch(resetError())
    }
  }, [basketError])
  
  // Success actions
  useEffect(() => {
    if (APIsuccess) {
      if (successType === 'DELETE_RESTAURANT') {
        dispatch(resetSuccess())
        toast.success('Restaurant Deleted')
        navigate('/restaurants')
      }
    } if (DishSuccess) {
      if (DishSuccessType === 'DELETE_DISH') {
        dispatch(dishResetSuccess())
        toast.success('Dish Deleted')
      }
    }
  }, [APIsuccess, DishSuccess])

  // API error
  useEffect(() => {
    if (isError) {
      toast.error(`ERROR - ${message}`)
    }
    if (dishError) {
      toast.error(`ERROR - ${dishErrorMessage}`)
    }
}, [isError,dishError])
  
  if (isLoading) {
    return <Loading/>
  }

  if (isError || dishError) {
    return <Error code='500'/>
  }
  
  return (
    <main>
      {/* Consider cloudinary transformation API */}
      <img src={image} width="500px"></img>
      <h1>{r_name} </h1>

      {isOwner && <span>You own this restaurant</span>}
      
      <h3>{location}</h3>
      <div>
        <p>Rating: {avg_rating}</p>
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

      {dishLoading ? <Loading /> :
  
          dishes.map(dish => {
            const { d_id, name, price, image, available, starred, category, restaurant } = dish;
            return <article key={d_id}>
              <h4>{name}</h4>
              <p>{price} - {available ? 'Available' : 'Not available'}</p>
              <div>
                <button disabled={!available}
                  onClick={async () => {
                    dispatch(addItem(dish))
                  }}
                >Add to basket</button>
                
                {/* Show edit/delete buttons only if owner */}
                {isOwner && <>
                  <Link to={`../../dishes/${d_id}/${restaurant}/edit`}><button>Edit</button></Link>
                  <button onClick={() => { dispatch(deleteDish({ d_id, r_id })) }}>Delete</button>
                </>}
              </div>
            </article>
          })
        }

      <Reviews r_id={id} />
      <ReviewForm r_id={id}/>

    </main>
  )
}

export default SingleRestaurant