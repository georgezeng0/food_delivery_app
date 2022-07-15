import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ScreenSizes from '../utils/mediaVariables'

import { TiUser } from 'react-icons/ti'
import { MdOutlineShoppingBasket,MdRestaurantMenu  } from 'react-icons/md'
import { useState } from 'react'
import UserDropdown from './UserDropdown'
import { useEffect } from 'react'
import { resetAddToBasket } from '../features/basketSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const {total_items, isAddedToBasket} = useSelector(state=>state.basket)

  const [showUser, setShowUser] = useState(false);
  const { pathname } = useLocation()
  
  const toggleUserDropdown = () => {
    setShowUser(!showUser)
  }

  useEffect(() => {
    if (isAddedToBasket) {
      setTimeout(()=>dispatch(resetAddToBasket())
        , 100)
    }
  }, [isAddedToBasket])

    return (
      <Wrapper pathname={pathname}>
        <div className='nav-container left-container'>
        <Link className='home-icon' to="/">
            <h1 id='logo'>Deliver<span >Eat</span></h1></Link>
            </div>
        
        <div className='nav-container center-container'>
        <Link className='nav-link' to="/restaurants">
        {/* <div className='gradient'></div> */}
          <span>Restaurants</span></Link>
          

        <Link className='nav-link' to="/basket">
          {/* <div className='gradient'></div> */}
            <span>Basket&nbsp;<MdOutlineShoppingBasket />
            <span id='basket-number-icon' className={isAddedToBasket? 'addToBasket_animation':''}>{total_items}</span>
            </span>
          </Link>

          

        </div>

        <div className='nav-container right-container'>
        {user.token && 
          <span id='name' onClick={toggleUserDropdown}>{user.name}</span>
        }

          <TiUser className='user-icon' onClick={toggleUserDropdown} />

          <UserDropdown showUser={showUser}  user={user} toggleUserDropdown={toggleUserDropdown} />
    
        </div>

        <div className=' nav-container small-container'>

        <Link className='home-icon' to="/">
            <h1 id='logo'>Deliver<span >Eat</span></h1>
          </Link>
            
          
        <Link className='nav-link nav-link-icon' to="/restaurants">
            <span><MdRestaurantMenu /></span>
          </Link>
          
        <Link className='nav-link nav-link-icon' to="/basket">
            <span><MdOutlineShoppingBasket /><span id='basket-number-icon' className={isAddedToBasket? 'addToBasket_animation':''}>{total_items}</span></span>
          </Link>

          <TiUser className='user-icon' onClick={toggleUserDropdown} />

          <UserDropdown showUser={showUser}  user={user} toggleUserDropdown={toggleUserDropdown} />

        </div>
        
        
        
    </Wrapper>
  )
}

const Wrapper = styled.nav`
margin: 0;
    z-index: 10;
    min-width: var(--min-width);
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--nav-height);
    padding-left: 2%;
    padding-right: 2%;
    transition: all 0.5s ease-in;
    background-color: ${props=>props.pathname!=='/' ? `var(--primary-3)` : 'white'};
    position: fixed;
    * {
      text-decoration: none;
    } 
    #logo{
      font-size: 1.4rem;
      span{
        color: var(--tertiary-1);
      }
    }
    button {
      background-color: var(--white);
      border: none; 
      :hover {
        cursor: pointer;
      }
    }
    
    .user-icon{
      color: var(--primary-7);
      font-size: 1.6rem;
      min-width: 30px;
      transition:all 0.2s ease-out;
      :hover{
        cursor: pointer;
        color: var(--tertiary-1)
      }
    }
    .nav-container{
      display:flex;
      align-items: center;
      height: 100%;
    }
    .left-container{
      display:flex;
      align-items: center;
      width: 30%;
    }
    .center-container{
      width: 40%;
      justify-content: center;
      align-items: center;
      .nav-link{
        width: 150px;
      }
    }
    .right-container{
      width: 30%;
      justify-content: flex-end;
      align-items: center;
    }
    .nav-link {
      color: var(--primary-7);
      font-weight: 600;
      font-size: 1rem;
      transition:all 0.3s ease-out;
      height:100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      
      span{
        transition:all 0.3s ease-out;
        display:flex;
        align-items: center;
      }
    }
    .gradient{
      background-image: linear-gradient(var(--primary-0),white 40%, white 100%);
      transition:all 0.4s ease-in-out;
      position: absolute;
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      opacity: 0%;
    }
    .nav-link:hover {
      #basket-number-icon{
        color: black;
        transform: translateY(0px);
        text-shadow: 0px 0px 0px var(--tertiary-7);
      }
      span {
        color: var(--tertiary-1);
        transform: translateY(4px);
        text-shadow: 0px 0px 3px var(--tertiary-7);
      }
      .gradient {
        opacity:60%
      }
      
    }
    .home-icon{
      justify-content: flex-start;
      transition: all 0.3s ease-out;
      span{
        transition: all 0.3s ease-out;
      }
      :hover{
        color: var(--tertiary-1);
        #logo{
          span{
          color: var(--primary-5);
          }
        }
      }
    }
    #name{
      color:var(--primary-7);
      transition: 0.2s;
      :hover{
      cursor: pointer;
      color: var(--tertiary-1)
      }
    }
    #basket-number-icon{
      background-color: var(--tertiary-1);
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
      position: relative;
      top: -5px;
      right: 3px;
    }
    .addToBasket_animation{
      transform: translateY(-5px)
    }
    .nav-link-icon{
      display: none;
      }
      .small-container{
        display:none;
      }
    @media (max-width: ${ScreenSizes.breakpoint_md}) {
      justify-content: center;
      .center-container,.left-container,.right-container{
        display:none;
      }
      #name{
        display:none;
      }
      .small-container{
        display: flex;
        width: 66%;
        justify-content: space-around;
        align-items: center;
      }
      .nav-link-icon{
      display: flex;
      font-size: 1.4rem;
      margin-left: 5px;
      }
      .nav-link:hover{
        span{
        transform: translateY(0%);
        }
      }
    }
`;

export default Navbar