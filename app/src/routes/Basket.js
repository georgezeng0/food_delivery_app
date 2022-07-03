import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BasketItems, BasketTotals } from '../components'
import axios from 'axios'
import { useState } from 'react'

const Basket = () => {
  const { basket } = useSelector(state => state.basket)
  const [restaurant, setRestaurant] = useState({})

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

  return (
    <main>
      <h1>Your Basket</h1>
      <div>
        {basket.length>0 &&
          <h3>Ordering from: <Link to={`/restaurants/${restaurant.r_id}`}>{restaurant.r_name}</Link></h3>
        }
      </div>
      <div>
        <BasketItems/>
      </div>
      <div>
        <BasketTotals/>
      </div>
      <div>
        <Link to="/checkout"><button>Checkout</button></Link>
        <Link to="/login"><button>Login</button></Link>
      </div>
    </main>
  )
}

export default Basket