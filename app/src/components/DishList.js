import React from 'react'
import { deleteDish} from '../features/dishSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/basketSlice';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillStar } from 'react-icons/ai'

const DishList = ({ isOwner, r_id }) => {
    const dispatch = useDispatch()
    const { dishes, filter } = useSelector(state => state.dish)
    const categories = ["starred","starter","main","side","dessert","drink"]
    return (
        <Wrapper>
            {
                categories.map(
                    (cat, i) => {
                        if (!filter || filter === cat || filter === "starred" && cat==="starred") {
                            return <div key={i} className='category-container'>
                                <h3 className='category-name'>
                                    {cat === 'starred' ? `popular` : cat}
                                    {cat === 'starred' && <AiFillStar className='star' />}
                                </h3>
                                <div className='dishes-container'>
                                    {dishes.map(dish => {
                                        const { d_id, name, price, image, available, starred, category, restaurant } = dish;
                                        if (cat === "starred" ? starred : category === cat)
                                            return <article key={d_id} className='dish'>
                                                <h4 className='dish-name'>{name}</h4>
                                                <span className='dish-price'>£{(price / 100).toFixed(2)}</span>
                                                <span className={available ? 'available' : 'not-available'}>{available ? 'Available' : 'Not available'}</span>
                                        
                                                <div className='btn-container'>
                                                    <button disabled={!available}
                                                        onClick={async () => {
                                                            dispatch(addItem(dish))
                                                        }}
                                                    >Add to basket</button>
                        
                                                    {/* Show edit/delete buttons only if owner */}
                                                    {isOwner && <>
                                                        <Link to={`../../dishes/${d_id}/${restaurant}/edit`}><button>Edit Dish</button></Link>
                                                        <button onClick={() => { dispatch(deleteDish({ d_id, r_id })) }}>Delete Dish</button>
                                                    </>}
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
    width: 100%;
    text-align: center;
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
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
    width: 50%;
    button{
        width: 100%;
        border: none;
        border-radius: 10px;
        margin-top: 5px;
        background-color: var(--primary-3);
        box-shadow: 0 0 2px 2px var(--grey-3)
    }
}
`

export default DishList