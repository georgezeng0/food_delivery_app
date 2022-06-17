import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemAmount, deleteItem, minusItemAmount } from '../features/basketSlice'

const BasketItems = () => {
    const dispatch = useDispatch();
    const { basket } = useSelector(state => state.basket)
    
    if (basket.length < 1) {
        return <section>
            <h3>Your basket is empty...</h3>
        </section>
    }

  return (
      <section>
          {basket.map(item => {
              const { d_id, amount, price,name } = item;
              return <article key={d_id}>
                  {name} - {price} - Qty: {amount} - total: {amount * price}
                  <button onClick={()=>dispatch(addItemAmount(d_id))}>Add one</button>
                  <button onClick={()=>dispatch(minusItemAmount(d_id))}>Remove one</button>
                  <button onClick={()=>dispatch(deleteItem(d_id))}>Remove all</button>
              </article>
          })}
    </section>
  )
}

export default BasketItems