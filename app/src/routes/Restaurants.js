import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurants, refreshSort } from '../features/restaurantSlice'
import { Loading, FilterSearch,Restaurant } from '../components'
import { toast } from 'react-toastify';
import styled from 'styled-components'
import ScreenSizes from '../utils/mediaVariables'
import {AiOutlineMenu,AiFillCaretRight} from 'react-icons/ai'

const Restaurants = () => {
  const { restaurants:all_restaurants,sorted_restaurants: restaurants, isLoading,
  error:{isError,message}
  } = useSelector(state => state.restaurant);
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false)
  const [scrollY, setScrollY] = useState('')
  const [page, setPage] = useState(1);
  const [scrollLoading,setScrollLoading]=useState(false)
  // Num per page
  const num_per_page = 5
  // const max_pages = Math.ceil(restaurants.length / num_per_page);

  const handleScroll = (e) => {
    setScrollY(window.scrollY);
}

  useEffect(() => {    
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Interaction observer - infinte scroll function
  const last_item = useRef(null);
  // useCallback so that the function isn't reconstructed each time page changes
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setScrollLoading(true)
      setTimeout(() => {
        setPage((prev) => {
          //   if (prev < max_pages) {
          //   return prev + 1
          //   } else {
          //     return prev
          // }
          return prev + 1
        })
        setScrollLoading(false)
      }, 500)
      
      };
    },[])
;

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: `0px`,
      threshold: 0.1
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (last_item.current) {
      observer.observe(last_item.current);
    }
    return () => observer.disconnect();
    // Need to discmount otherwise loops
  }, [handleObserver, last_item.current]);
  // Need these dependencies otherwise

  useEffect(() => {
    setPage(1);
    dispatch(getRestaurants());
  }, [])

  useEffect(() => {
    if (all_restaurants) {
      setPage(1);
      dispatch(refreshSort());
    }
  },[all_restaurants])
  
  useEffect(() => {
    if (isError) {
      toast.error(`ERROR - ${message}`)
    }
    
  }, [isError])

  return (
    <Wrapper showFilter={showFilter} scrollY={scrollY}>
      <section className='map-container'>
        <img src="https://images.unsplash.com/photo-1651307445960-defaf8fbb170?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
      </section>

      <div className='horizontal-placeholder'/>
      <div className='location-container'>
        <AiOutlineMenu className='menu-icon' onClick={()=>setShowFilter(!showFilter) } />
        <input type="text" placeholder={`Enter your location...`} />
        <AiFillCaretRight fontSize={`1.5rem`} />
      </div>
      <div className='filter-menu-container'>
        <FilterSearch horizontal setPage={setPage}/>
      </div>

      

      <div className='responsive-container'>
        {/* Filter section */}
        <div className="block-placeholder" />
      <section className='filter-container'>
          <FilterSearch setPage={setPage} />
        </section>

      {/* Loading and All Restaurants */}
      <section className='restaurants-container'>
      {isLoading ? <Loading /> :
        <section className='restaurants-content'>
          {/* Error Message */}
          {isError && <h4>Error getting restaurants.</h4>}

          {restaurants.slice(0,page*num_per_page).map(r => {
            const { r_id} = r
            return <Restaurant key={r_id} restaurant={{ ...r}}>
            </Restaurant>
          })}
              <div ref={last_item}></div>
              
        </section>
          }
          <div className='scroll-loading-container'>
            {scrollLoading && <Loading />}
            </div>
        </section>
        </div>
      
    </Wrapper>
  )
}

const Wrapper = styled.main`
min-width: 260px;
  padding-top: var(--nav-height);
  display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 20px;
  .map-container{
    height: 300px;
    width: 100%;
    img{
      height: 100%;
      width: 100%;
      object-fit: cover
    }
  }
  .horizontal-placeholder{
    width: 100%;
    height: ${props => {
  return (props.scrollY > 300 ? (props.showFilter ? '94px' : '44px') : '0px');
    } };
  }
  .location-container{
    background-color: var(--tertiary-1);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    color: var(--white);
    position: ${props => props.scrollY > 300 && `fixed`};
    top: ${props => props.scrollY > 300 && `var(--nav-height)`};
    z-index: 1;
  }
  .responsive-container{
    display: flex;
    width: 80%;
    max-width: var(--max-width-main);
  }
  .block-placeholder{
    width:  ${props => props.scrollY > 300 && `250px`};
    transition: width 0.5s linear;
  }
  .filter-container{
    position: ${props => props.scrollY > 300 && `fixed`};
    top: ${props => props.scrollY > 300 && `calc(var(--nav-height) + 44px )`};
    width: 250px;
    height: 500px;
    transition: width 0.5s linear;
  }
  .filter-menu-container{
    width: 100%;
    height: 0;
    overflow: hidden;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    position: ${props => props.scrollY > 300 && `fixed`};
    top: ${props => props.scrollY > 300 && `calc(var(--nav-height) + 44px )`};
    z-index: 1;
    margin-top: -1px;
  }
  .restaurants-container{
    margin-left: 20px;
    flex-grow: 1;
    transition: margin 0.5s linear;
  }
  .restaurants-content{
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
  }
  .menu-icon{
    display:none;
  }
  .scroll-loading-container{
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 40px 0px;
  }
  
  @media (max-width: ${ScreenSizes.breakpoint_xl}) {
    .restaurants-content{
      display: flex;
      flex-direction: column;    
  }
  }
  @media (max-width: ${ScreenSizes.breakpoint_md}){
    .filter-container, .block-placeholder{
      width: 0;
      transition: width 0.5s linear 0.25s;
    }
    .menu-icon{
      display: block;
      position: absolute;
      left: 20px;
      font-size: 2rem;
    }
    .filter-menu-container{
      height: ${props=>props.showFilter&&`50px`} ;
      transition: all 0.5s;
    }
    .restaurants-container{
      transition: margin 0.4s linear 0.3s;
      margin-left:0;
      }
  }
  @media (max-width: 600px){
    .filter-menu-container{
      height: ${props=>props.showFilter&&`100px`} ;
      transition: all 0.5s;
    }
    @media (max-width: ${ScreenSizes.breakpoint_sm}){
      .menu-icon{
        position: static;
      }
      .location-container{
        min-width: 260px;
      }
      .responsive-container{
        width: 100%;
        transition: width 0.4s;
      }
      .restaurants-container{
        margin-left:0;
        transition:  margin 0.4s;
      }
    }
}

`

export default Restaurants