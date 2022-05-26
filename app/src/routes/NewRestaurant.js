import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createRestaurant } from '../features/restaurantSlice'

const NewRestaurant = () => {
    let { isEdit, error: { isError } } = useSelector(state => state.restaurant)
    // TBD - dynamically change page to new/edit

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { id } = useParams()   
    // EDIT page - Need redux here and API to fetch one restaurant details 

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createRestaurant({ r_id: uuid(), r_name: name, location }));
    }

  return (
      <main>
          <h1>New Restaurant</h1>
          <div>
              <form onSubmit={handleSubmit}>
                  <div>
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name"
                          value={name}
                          onChange={(e)=>setName(e.target.value)} />
                    </div>
                  <div>
                      <label htmlFor="location">Location</label>
                      <input type="text" id="location"
                            value={location}
                            onChange={(e)=>setLocation(e.target.value)}/>
                    </div>
                  <button>Submit</button>
              </form>
          </div>
    </main>
  )
}

export default NewRestaurant