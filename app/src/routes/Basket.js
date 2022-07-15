import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BasketItems, BasketTotals, Restaurant } from '../components'
import axios from 'axios'
import { useState } from 'react'
import { emptyBasket } from '../features/basketSlice'
import Wrapper from '../utils/wrappers/basketWrapper'

const Basket = () => {
  const { basket } = useSelector(state => state.basket)
  const [restaurant, setRestaurant] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getRestaurantById = async (id) => {
    try {
      const res = await axios(`api/restaurants/${id}`)
      setRestaurant(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (basket.length > 0) {
      getRestaurantById(basket[0].restaurant)
    }
  }, [basket])

  if (basket.length === 0) {
    return (
<Wrapper>
      <h1 id="title">Your Basket</h1>
      
      <div className="content-container empty">
          <h2>Your Basket is empty...</h2>
          <h3>Click <Link to='/restaurants'>here</Link> to browse restaurants</h3>
          <div id='empty'></div>
      </div>
    </Wrapper>

    )
  }

  return (
    <Wrapper>
      <h1 id="title">Your Basket</h1>
      
      <div className="content-container">
        <div className="horizontal-bar"></div>
            {basket.length > 0 &&
              <div className='restaurant-origin'>
              
              <h2>You are ordering from:</h2>
              <div className="restaurant-info">
                <Restaurant restaurant={{ ...restaurant }} />
                </div>
            </div>
          }
      
        <div className='basket-container'>
          <BasketItems/>
        </div>
        <div className="totals-container">
          <BasketTotals/>
        </div>
        <div className='checkout-btn-container'>
          <Link to="/checkout"><button>Checkout</button></Link>
          
        </div>
        <div className='empty-btn-container'>
              <button onClick={()=>dispatch(emptyBasket())}>Empty Basket</button>
          </div>
      </div>
    </Wrapper>
  )
}

export default Basket