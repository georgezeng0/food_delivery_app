import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurants, updateSort } from '../features/restaurantSlice'
import { Loading, FilterSearch,Restaurant } from '../components'
import { toast } from 'react-toastify';
import styled from 'styled-components'

const Restaurants = () => {
  const { restaurants:all_restaurants,sorted_restaurants: restaurants, isLoading,
  error:{isError,message}
  } = useSelector(state => state.restaurant);
  const dispatch = useDispatch();

  useEffect(() => {
    if (all_restaurants.length===0) {
      dispatch(getRestaurants());
    }
  }, [dispatch])
  
  useEffect(() => {
    if (isError) {
      toast.error(`ERROR - ${message}`)
    }
    
  }, [isError])

  return (
    <Wrapper>
      <section className='map-container'>
        <img src="https://images.unsplash.com/photo-1651307445960-defaf8fbb170?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
      </section>

      <div className='responsive-container'>
      {/* Filter section */}
      <section className='filter-container'>
        <FilterSearch />
        </section>

      {/* Loading and All Restaurants */}
      <section className='restaurants-container'>
      {isLoading ? <Loading /> :
        <section>
          {/* Error Message */}
          {isError && <h4>Error getting restaurants.</h4>}

          {restaurants.map(r => {
            const { r_id} = r
            return <Restaurant key={r_id} restaurant={{ ...r}}>
            </Restaurant>
          })}
        </section>
        }
        </section>
        </div>
      
    </Wrapper>
  )
}

const Wrapper = styled.main`
  padding-top: var(--nav-height);
  .map-container{
    height: 300px;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover
    }
  }
  .responsive-container{
    display: flex;
    padding: 0% 5%;
  }
  .filter-container{
    width: 300px;
    height: 500px;
    background-color: var(--tertiary-1);
  }
  .restaurants-container{
    width: auto;
    flex-grow: 1;
    margin-left: 20px;
  }

`

export default Restaurants