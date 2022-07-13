import React from 'react'
import { deleteDish} from '../features/dishSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/basketSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai'
import ScreenSizes from '../utils/mediaVariables';
import { minusItemAmount } from '../features/basketSlice'

const DishList = ({ isOwner, r_id }) => {
    const dispatch = useDispatch()
    const { dishes, filter } = useSelector(state => state.dish)
    const { basket,isAddedToBasket } = useSelector(state=>state.basket)
    const categories = ["starred", "starter", "main", "side", "dessert", "drink"]
    const categories_diplay = ["Popular","Starters","Main Courses", "Sides", "Dessert", "Drinks"]   
    
    return (
        <Wrapper>
            {
                categories.map(
                    (cat, i) => {
                        if (!filter || filter === cat || filter === "starred" && cat==="starred") {
                            return <div key={i} className='category-container'>
                                <h3 className='category-name'>
                                    {categories_diplay[i]}
                                    {cat === 'starred' && <AiFillStar className='star' />}
                                </h3>
                                <div className='dishes-container'>
                                    {dishes.map(dish => {
                                        const { d_id, name, price, image, available, starred, category, restaurant } = dish;
                                        const dishBasketAmount = basket.find(item => item?.d_id === d_id)?.amount
                                        if (cat === "starred" ? starred : category === cat)
                                            return <article key={d_id} className={`dish `} >
                                                <div className={`${dishBasketAmount ? 'in-basket' : ''}`}>
                                                    <span className={`basket-counter ${dishBasketAmount ? 'in-basket' : ''} ${isAddedToBasket? 'addToBasketAnimation':''}`}>{dishBasketAmount}</span>
                                                </div>
                                                <div className='dish-contents'>
                                                <h4 className='dish-name'>{name}</h4>
                                                <span className='dish-price'>£{(price / 100).toFixed(2)}</span>
                                                <span className={available ? 'available' : 'not-available'}>{available ? 'Available' : 'Not available'}</span>
                                        
                                                <div className='btn-container'>
                                                    
                                                    <button disabled={!available}
                                                        onClick={async () => {
                                                            dispatch(addItem(dish))
                                                        }}
                                                    >{dishBasketAmount? 'Add Another' : 'Add to basket'}</button>
                                                    
                                                        {dishBasketAmount &&
                                                    <button disabled={!available}
                                                    onClick={async () => {
                                                        dispatch(minusItemAmount(d_id))
                                                    }}
                                                >{dishBasketAmount>1?'Remove One':'Remove Dish'}</button>
                                                    }    

                                                    {/* Show edit/delete buttons only if owner */}
                                                    {isOwner && <>
                                                        <Link className='link-btn' to={`../../dishes/${d_id}/${restaurant}/edit`}><button>Edit Dish</button></Link>
                                                        <button onClick={() => { dispatch(deleteDish({ d_id, r_id })) }}>Delete Dish</button>
                                                    </>}
                                                    </div>
                                                    </div>
                                            </article>
                                
                                    })}
                                </div>
                            </div>
                        }
                    }

                )
                 
            }

   
    </Wrapper>
  )
}

const Wrapper = styled.section`
width: 100%;
.category-container{
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;;
}
.category-name{
text-transform: capitalize;
width: 100%;
padding-bottom: 10px;
border-bottom: 2px solid var(--primary-3);
display: flex;
align-items: center;
justify-content: center;
.star{
        color: var(--tertiary-1);
    }
}
.dishes-container{
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
}
.dish{
    height: 100%;
    width: 100%;
    text-align: center;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    position: relative;
    box-sizing: border-box;
}
.in-basket{
    background-color: var(--secondary-1);
    height: 90%;
    width: 70%;
    position: absolute;
    z-index: 1;
    border-radius: 40px;
    display: flex;
    justify-content: flex-end;
}
.basket-counter.in-basket{
    position: relative;
    background-color: var(--tertiary-1);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s;
}
.basket-counter.addToBasketAnimation{
    transform: translateY(-5px)
}
.dish-contents{
    text-align: center;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
    width: 100%;
    z-index: 2;
}
.dish-name{
    margin: 2px 0px 2px;
}
.available{
    color: green;
}
.not-available{
    color: red;
}
.btn-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50% !important;
    button{
        width: 100%;
        border: none;
        border-radius: 10px;
        margin-top: 5px;
        background-color: var(--primary-3);
        box-shadow: 0 0 2px 2px var(--grey-3)
    }
    .link-btn{
        width: 100%;
    }
}
@media (max-width: ${ScreenSizes.breakpoint_md}){
    .dishes-container{
        display: flex;
        flex-direction: column;
    }
}
`

export default DishList