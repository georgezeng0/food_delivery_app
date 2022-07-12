import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BasketItems, BasketTotals, Restaurant } from '../components'
import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'
import { emptyBasket } from '../features/basketSlice'

const Basket = () => {
  const { basket } = useSelector(state => state.basket)
  const [restaurant, setRestaurant] = useState({})
  const dispatch = useDispatch()

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

const Wrapper = styled.main`
padding-top: calc( var(--nav-height) + 30px);
padding-bottom: 3rem;
display: flex;
flex-direction: column;
align-items:center;
#title{
  text-align: center;
  width: auto;
  background-color: var(--tertiary-1);
  color: white;
  position: relative;
  padding: 5px 25px;
  margin-bottom:0;
  box-shadow: 0px -2.5px 2.5px 2.5px var(--grey-2);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.horizontal-bar{
  height: 80px;
  width: 80%;
  position: absolute;
  background-color: var(--primary-3);
  top: 230px;
}
.content-container{
  box-shadow: 0px 0px 5px 5px var(--grey-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: var(--max-width);
}
.restaurant-origin{
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 50px;
  width: 100%;
  box-sizing: border-box;
  h2{
    text-decoration: underline;
    margin-top: 0px;
  }
}
.restaurant-info{
  width: 80%;
}
.basket-container{
width: 100%;
padding: 20px;
display: flex;
justify-content: center;
box-sizing: border-box;
}
.totals-container{
  min-width: 400px;
  align-self: flex-end;
  padding: 20px;
  box-sizing: border-box;
}
.checkout-btn-container{
  padding: 0px 20px 20px;;
  box-sizing: border-box;
  align-self: flex-end;
  button{
    padding: 10px 30px;
    border-radius: 15px;
    background-color: var(--tertiary-1);
    color: white;
    font-weight: 600;
    font-size: 1.6rem;
    transition: 0.2s;
    :hover{
      cursor: pointer;
      background-color: var(--primary-3);
    }
  }
}
.empty-btn-container{
  background-color: var(--grey-1);
  width: 100%;
  border-top: 2px solid grey;
  padding: 20px 0px 20px;
  text-align: center;
  button{
    padding: 10px 30px;
    border-radius: 15px;
    background-color: var(--red-dark);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    transition: 0.2s;
    :hover{
      cursor: pointer;
      background-color: var(--red-light);
    }
  }
}
.empty{
  height: 300px;
  justify-content: center;
  padding-bottom: 20px;
}
`

export default Basket