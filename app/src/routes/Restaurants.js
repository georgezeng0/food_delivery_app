import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurants } from '../features/restaurantSlice'
import { Loading } from '../components'
import { toast } from 'react-toastify';

const Restaurants = () => {
  const { restaurants, isLoading,
  error:{isError,message}
  } = useSelector(state => state.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurants());
  }, [dispatch])
  
  useEffect(() => {
    if (isError) {
      toast.error(`ERROR - ${message}`)
    }
    
  },[isError])

  return (
    <main>
      <h1>All restaurants</h1>


      <div>
        <Link to='/restaurants/create'>Create Restaurant</Link>
      </div>

      {/* Loading and All Restaurants */}
      {isLoading ? <Loading /> :
        <section>
          {/* Error Message */}
          {isError && <h4>Error getting restaurants.</h4>}

          {restaurants.map(r => {
            const { r_id, r_name, location } = r
            return <article key={r_id}>
              <h3>{r_name} - {location}</h3>
              <Link to={`/restaurants/${r_id}`}><button>View</button></Link>
            </article>
          })}
        </section>
      }
      
    </main>
  )
}

export default Restaurants