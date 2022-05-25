import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([])

  const getRestaurants = async () => {
    try {
      const res = await axios('/api/restaurants');
      setRestaurants(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  
  const deleteRestaurant = async (r_id) => {
    try {
      const res = await axios.delete(`/api/restaurants/${r_id}`);
      console.log(res)
      if (res.data.length > 0) {
        alert("successfully deleted")
        getRestaurants();
      } else {throw new Error("Unsuccessful Deletion")}
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRestaurants()
  },[])

  return (
    <main>
      <h1>All restaurants</h1>
      <div>
        <Link to='/restaurants/create'>Create Restaurant</Link>
      </div>
      <section>
        {restaurants.map(r => {
          const { r_id, r_name, location } = r
          return <article key={r_id}>
            <h3>{r_name}-{location}</h3>
            <Link to='/restaurants/:id/edit'>Edit</Link>
            <button onClick={()=>deleteRestaurant(r_id)}>Delete</button>
          </article>
        })}
      </section>
    </main>
  )
}

export default Restaurants