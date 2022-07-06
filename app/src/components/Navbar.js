import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ScreenSizes from '../utils/mediaVariables'

import { TiUser } from 'react-icons/ti'
import { MdOutlineShoppingBasket,MdRestaurantMenu  } from 'react-icons/md'
import { useState } from 'react'
import UserDropdown from './UserDropdown'

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const [showUser, setShowUser] = useState(false);
  
  const toggleUserDropdown = () => {
    setShowUser(!showUser)
  }

    return (
      <Wrapper>
        <div className='nav-container left-container'>
        <Link className='home-icon' to="/">
            <h1 id='logo'>Deliver<span >Eat</span></h1></Link>
            </div>
        
        <div className='nav-container center-container'>
        <Link className='nav-link' to="/restaurants">
        <div className='gradient'></div>
          <span>Restaurants</span></Link>
          

        <Link className='nav-link' to="/basket">
          <div className='gradient'></div>
            <span>Basket&nbsp;<MdOutlineShoppingBasket/></span>
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
            <span><MdOutlineShoppingBasket /></span>
          </Link>

          <TiUser className='user-icon' onClick={toggleUserDropdown} />

          <UserDropdown showUser={showUser}  user={user} toggleUserDropdown={toggleUserDropdown} />

        </div>
        
        
        
    </Wrapper>
  )
}

const Wrapper = styled.nav`
    min-width: var(--min-width);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--nav-height);
    padding-left: 2%;
    padding-right: 2%;
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