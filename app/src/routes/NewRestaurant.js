import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createRestaurant, editRestaurant, getRestaurants, emptyForm,
    updateForm, getCuisines, populateForm } from '../features/restaurantSlice'

const NewRestaurant = () => {
    let {
        restaurants,
        form: { r_name, cuisine, pricepoint, location, open, close, cuisineList }
        } = useSelector(state => state.restaurant)

    const [isEdit, setIsEdit] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();   

    useEffect(() => {
        if (restaurants.length === 0) {
            dispatch(getRestaurants())
        } 
        if (id) {
            setIsEdit(true);
            dispatch(populateForm(id))
        } else {
            dispatch(emptyForm())
        }
        dispatch(getCuisines()) // Gets the list of cuisines for the form dynamically
    }, [restaurants]);

    // EDIT page - Need redux here and API to fetch one restaurant details 

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isEdit) {
            dispatch(createRestaurant());
        } else {
            dispatch(editRestaurant(id));
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const checked = e.target.checked;
        dispatch(updateForm({name,value,checked}))
    }

  return (
      <main>
          <h1>{`${isEdit? "Edit":"New"} Restaurant`}</h1>
          <div>
              <form onSubmit={handleSubmit}>
                  {/* Name text form */}
                  <div>
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="r_name"
                          value={r_name}
                          onChange={handleChange} />
                  </div>
                  {/* Cuisines checkbox */}
                  <div>
                      <legend>Cuisine</legend>
                      <fieldset>
                  {cuisineList.map((item,i)=> {
                      return <div key={i}>
                          <label htmlFor={item}>{item}</label>
                          <input type="checkbox" name="cuisine"
                              value={item} id={item}
                              onChange={handleChange}
                              checked={cuisine.includes(item)? true:false}
                          />
                          </div>
                    })}
                          </fieldset>
                  </div>
                  {/* Pricepoint range */}
                  <div>
                      <label htmlFor="pricepoint">Pricepoint</label>
                      <input type="range" id="pricepoint" name="pricepoint"
                          value={pricepoint} min="1" max="3"
                          onChange={handleChange} />
                  </div>
                  {/* Location textform */}
                  <div>
                      <label htmlFor="location">Postcode</label>
                      <input type="text" id="location" name="location"
                            value={location}
                            onChange={handleChange}/>
                  </div>
                  {/* Open and close times */}
                  <div>
                      <label htmlFor="open">Open</label>
                      <input type="time" id="open" name="open"
                            value={open}
                            onChange={handleChange}/>
                      <label htmlFor="close">Close</label>
                      <input type="time" id="close" name="close"
                            value={close}
                            onChange={handleChange}/>
                  </div>
                  <button>Submit</button>
              </form>
          </div>
    </main>
  )
}

export default NewRestaurant