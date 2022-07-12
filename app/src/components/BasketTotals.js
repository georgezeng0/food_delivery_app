import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'


const BasketTotals = () => {

    const {total_price,total_items, service_charge} = useSelector(state=>state.basket)
  return (
    <Wrapper>
      <div className='totals'>
          <div>Number of Items:</div><span>{total_items}</span>
          <div>Sub-Total:</div><span>£{(total_price/100).toFixed(2)}</span>
          <div>Service:</div><span>£{(service_charge/100).toFixed(2)}</span>
        <div id='to-pay'>To Pay:</div><span id='to-pay'>£{total_price > 0 ? ((total_price + service_charge)/100).toFixed(2) : (0).toFixed(2)}</span>
        </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
border: 2px solid grey;
padding: 10px;
display: flex;
flex-direction: column;
align-items: center;
.totals{
 display: grid;
 grid-template-columns: 70% 30%;
 text-align: end;
 width: 100%;
 div{
  margin-bottom: 3px;
 }
}
#to-pay{
  font-weight: 600;
}
`

export default BasketTotals