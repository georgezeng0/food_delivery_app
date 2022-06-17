import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emptyBasket } from '../features/basketSlice'

const BasketTotals = () => {
    const dispatch = useDispatch()
    const {total_price,total_items, service_charge} = useSelector(state=>state.basket)
  return (
      <div>
          Amount: {total_items}
          Basket total: {total_price}
          Service Fee: {service_charge}
          Total: {total_price>0 ? total_price + service_charge: 0}
          <div>
              <button onClick={()=>dispatch(emptyBasket())}>Empty Basket</button>
          </div>
    </div>
  )
}

export default BasketTotals