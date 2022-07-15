import Wrapper from '../utils/wrappers/basketWrapper'
import React from 'react'
import { BasketTotals, Loading } from '../components'
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { emptyBasket } from '../features/basketSlice';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const CheckoutForm = ({total_price}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const fetchPaymentIntent = async () => {
    try {
      const res = await axios.post(
        '/api/stripe/charge',
        { amount:total_price },
      )
      return res.data.clientSecret
    } catch (error) {
      console.log(error);
      toast.error('Error connecting to payment server')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (elements == null) {
      return;
    }
    try {
    const clientSecret = await fetchPaymentIntent()
    setIsLoading(true);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      }
    );
    setIsLoading(false);
    if (error) {
      toast.error('Payment Failed')
      console.log('Payment confirmation error', error);
    } else if (paymentIntent) {
      toast.success('Payment Success')
      console.log('Success from promise', paymentIntent);
      dispatch(emptyBasket())
      setTimeout(()=>navigate('/restaurants'), 2000)
      }
    } catch (error) {
      setIsLoading(false);
      toast.error('Payment Failed')
    }
  };


  return (
    <form className='checkout-form' onSubmit={handleSubmit}  > 
      <CardElement className='card-element' />
      {isLoading ? 
        <button id='loading' disabled><Loading /></button>
        :
                <button disabled={!stripe || !elements}>Pay</button>
  }
    </form>
  )

}

const Checkout = () => {
  const { total_price } = useSelector(state => state.basket)

  if (!total_price) {
    return <Wrapper>
    <h1 id="title">Checkout</h1>
    
    <div className="content-container empty">
        <h2> Your Basket is Empty... </h2>
        <h3>Click <Link to='/restaurants'>Here</Link> to browse restaurants.</h3>
        <div id='empty'></div>
      </div>
  </Wrapper>
  }

  return (
    <Wrapper>
      <h1 id="title">Checkout</h1>
      
      <div className="content-container">

        <div className="totals-container checkout">
          <BasketTotals/>
        </div>

          <FormWrapper className='form-container'>
          <Elements stripe={stripePromise}>
            <CheckoutForm total_price={total_price} />
              </Elements>
          </FormWrapper>
          </div>
    </Wrapper>
  )
}

const FormWrapper = styled.div`
 width: 300px;
 display: flex;
 flex-direction: column;
 .checkout-form{
  margin-top: 10px;
  display: flex;
 flex-direction: column;
 button{
  margin: 20px 40px 40px;
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
 .card-element{
border: 2px solid var(--secondary-3);
padding: 10px;
 }
 #loading{
  font-size: 0.6rem;
 }
 `

export default Checkout