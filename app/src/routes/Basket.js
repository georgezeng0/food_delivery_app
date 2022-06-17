import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BasketItems, BasketTotals } from '../components'

const Basket = () => {
  //const { basket }= useSelector(state=>state.basket)

  return (
    <main>
      <h1>Your Basket</h1>
      <div>
        <h3>Ordering from: </h3>
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