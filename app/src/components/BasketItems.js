import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { addItemAmount, deleteItem, minusItemAmount } from '../features/basketSlice'
import { AiOutlinePlusCircle,AiOutlineMinusCircle,AiOutlineDelete } from 'react-icons/ai';
import ScreenSizes from '../utils/mediaVariables';

const BasketItems = () => {
    const dispatch = useDispatch();
    const { basket } = useSelector(state => state.basket)
    
    if (basket.length < 1) {
        return <Wrapper>
            <h3>Your basket is empty...</h3>
        </Wrapper>
    }

  return (
      <Wrapper>
          <div className="item-row headings">
              <span>Item</span>
              <span className='price'>Price</span>
              <span>Qty</span>
              <span className='total'>Item Total</span>
              <span></span>
          </div>
          {basket.map(item => {
              const { d_id, amount, price,name } = item;
              return <article key={d_id} className="item-row">
                  <span>{name}</span>
                  <span className='price'>£{(price / 100).toFixed(2)}</span>
                  <span>{amount}</span>
                  <span className='total'>£{((amount * price)/100).toFixed(2)}</span>
                  <div className="item-button-container">
                  <button onClick={()=>dispatch(addItemAmount(d_id))}><AiOutlinePlusCircle/></button>
                  <button onClick={()=>dispatch(minusItemAmount(d_id))}><AiOutlineMinusCircle/></button>
                  <button id="delete-btn" onClick={()=>dispatch(deleteItem(d_id))}><AiOutlineDelete/></button>
                  </div>
              </article>
          })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
width: 100%;
.item-row{
    display: grid;
    grid-template-columns: 50% 10% 10% 12% 18%;
    align-items: center;
}
.item-button-container{
    display: flex;
    justify-content: flex-end;
    button{
        background-color: white;
        border: none;
        font-size: 1.5rem;
        color: var(--tertiary-4);
        transition: 0.2s;
        :hover{
            cursor: pointer;
            color: var(--primary-4);
        }
    }
}
#delete-btn{
    color: var(--red-light);
    :hover{
            cursor: pointer;
            color: var(--red-dark);
        }
}
.headings{
    font-weight: 600;
    border-bottom: 2px solid grey;
    padding-bottom: 5px;
    margin-bottom: 5px;
}
@media (max-width: ${ScreenSizes.breakpoint_md}){
.item-row{
    grid-template-columns: 35% 15% 10% 15% 20%;
}
}
@media (max-width: 567px){
.item-row{
    grid-template-columns: 50% 10% 40%;
    font-size: 0.8rem;
}
.price{
    display: none;
}
.total{
    display: none;
}
}
`

export default BasketItems