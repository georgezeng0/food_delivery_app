import React from 'react'
import { deleteDish} from '../features/dishSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/basketSlice';
import { Link } from 'react-router-dom';

const DishList = ({ isOwner, r_id }) => {
    const dispatch = useDispatch()
    const { dishes, filter } = useSelector(state => state.dish)
    const categories = ["starred","starter","main","side","dessert","drink"]
    return (
        <section>
            {
                categories.map(
                    (cat, i) => {
                        if (!filter || filter===cat || filter==="starred")
                        return <div key={i}>
                            <h3>{cat}</h3>
                            {dishes.map(dish => {
                                const { d_id, name, price, image, available, starred, category, restaurant } = dish;
                                if (cat==="starred"?starred :category === cat)
                                    return <article key={d_id}>
                                        <h4>{name}</h4>
                                        <p>{price} - {available ? 'Available' : 'Not available'}</p>
                                        <div>
                                            <button disabled={!available}
                                                onClick={async () => {
                                                    dispatch(addItem(dish))
                                                }}
                                            >Add to basket</button>
                        
                                            {/* Show edit/delete buttons only if owner */}
                                            {isOwner && <>
                                                <Link to={`../../dishes/${d_id}/${restaurant}/edit`}><button>Edit</button></Link>
                                                <button onClick={() => { dispatch(deleteDish({ d_id, r_id })) }}>Delete</button>
                                            </>}
                                        </div>
                                    </article>
                            })}

                            </div>
                    }

                )
                 
            }

   
    </section>
  )
}

export default DishList