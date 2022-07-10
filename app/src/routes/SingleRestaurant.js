import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDishes, deleteDish,resetSuccess as dishResetSuccess } from '../features/dishSlice';
import { getRestaurants, deleteRestaurant, resetSuccess, resetError as resetRestaurantError } from '../features/restaurantSlice';
import {DishFilter, DishList, Loading, ReviewForm, Reviews} from '../components'
import { toast } from 'react-toastify';
import Error from './Error';
import { resetError } from '../features/basketSlice';
import axios from 'axios';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { BsCurrencyPound } from 'react-icons/bs'

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
  const {error: {isError:basketError, type:basketErrorType}} = useSelector(state=>state.basket)
  const {reviews} = useSelector(state=>state.review)
  
  const { r_id: id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  
  const {
    r_id, r_name, cuisine, pricepoint, location, open, close, owner, image,rating
  } = restaurant;

  const getRestaurant = async (id) => {
    try{
      const res = await axios(`/api/restaurants/${id}`)
      setRestaurant(res.data)
    }
    catch (error) {
      console.log(error);
      toast.error('Restaurant not found')
      navigate('/restaurants')
    }
  }

  useEffect(() => {
    getRestaurant(id)
  }, [reviews])

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

  if (isError) {
    if (message && message.match(/^403/gm)) {
      dispatch(resetRestaurantError())
      return <Error code='403'/>
    }
    dispatch(resetRestaurantError())
    return <Error code='500'/>
  }
  
  return (
    <Wrapper>
      <div className="content-container">

      <div className='img-container'>
          <img src={image}></img>
          
        </div>
        
        <div className="card-contents">

        <h1 id="name">{r_name} </h1>
      
          <div className='restaurant-info'>
            <h3>{location}</h3>
            <div className="ratings-container">
          <StarRatings
                            className="rating"
                            rating={rating}
                            isAggregateRating
                            starRatedColor="gold"
                            numberOfStars={5}
                            starDimension='15px'
              />
              <span>({reviews.length} review{`${reviews.length>1?'s':''}`})</span>
              </div>
          <p>{
              cuisine && cuisine.map((c, i) => { 
                if (i < (cuisine.length-1)) { return `${c}, ` }
                    else return c
              })
            }
            </p>
            <p>{new Array({ pricepoint }).map(
              (_, i) => {
                return <BsCurrencyPound key={i} />
              }
            )  }</p>
        <p>Open: {open}-{close}</p>
          </div>
          

          <div className="owner-actions">
            {isOwner && <span>You own this restaurant:</span>}

            {isOwner&&
            <div className='btn-container'>
              <Link to={`./edit`}><button>Edit Restaurant</button></Link>
              <Link to={`./new_dish`}><button>Add Dish</button></Link>
               <button className="last-btn" onClick={()=>dispatch(deleteRestaurant(r_id))}>Delete Restaurant</button>
              </div>}
            
          </div>


      {/* Show edit/delete buttons only if owner */}
      
      <div className='divider'/>
      <h2 id="dishes_title">Dishes</h2>

      <DishFilter/>

      {dishLoading ? <Loading /> :
        <DishList isOwner={isOwner} r_id={r_id}/>
      }

      <Reviews r_id={id} />
      <ReviewForm r_id={id}/>
        </div>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  padding: calc(var(--nav-height) + 40px) 40px 40px;
  display: flex;
  justify-content: center;
  .content-container{
    border-radius: 30px;
    overflow: hidden;
    max-width: 1200px;
    width: 100%;
    box-shadow: 0px 0px 5px 5px var(--grey-2);
  }

.img-container{
  width: 100%;
  height: 400px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
#name{
 text-align:center ;
 color: white;
 background-color: var(--tertiary-1);
 margin: 0px 20% 10px;
 padding: 5px;
 border-radius: 10px;
 width: 80%;
}
.card-contents{
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.restaurant-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    margin: 5px;
  }
}
.ratings-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5px;
}
.owner-actions{
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  border-radius: 20px;
  border: 3px solid var(--primary-3);
  overflow: hidden;
  span{
    margin-bottom: 6px;
  }
}
.btn-container{
  width: 100%;
  box-sizing: content-box;
  button{
    color: white;
    background-color: var(--primary-3);
    border: none;
    border-bottom: none;
    border-left: none;
    padding: 5px 10px 5px;
    transition: 0.2s;
    :hover{
      cursor: pointer;
      background-color: var(--primary-1);
      
    }
  }
  .last-btn{
    border-right: none;
  }
}
.divider{
  height: 10px;
  width: 100%;
  background-color: var(--primary-3);
  margin-top: 50px;
}
#dishes_title{
  margin: 0;
  padding: 10px;
}
`

export default SingleRestaurant