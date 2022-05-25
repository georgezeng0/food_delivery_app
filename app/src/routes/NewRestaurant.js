import React, { useState } from 'react'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { useParams } from 'react-router-dom'

const NewRestaurant = () => {
    const [isEdit,setIsEdit] = useState(false)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')


    const { id } = useParams()   
    // Need redux here and API to fetch one restaurant details
    
    const createRestaurant = async () => {
        try {
            const res = await axios.post(
                '/api/restaurants/new',
                {r_id:uuid(),r_name:name,location}
            )
            // TBD - success flash and redirect  
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createRestaurant()
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