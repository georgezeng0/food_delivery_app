import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { logout } from '../features/userSlice'

const Navbar = () => {
    const dispatch= useDispatch()

    return (
      <Wrapper>
        <Link to="/">Landing</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/login">Login</Link>
        <button onClick={() => { dispatch(logout()) }}>Logout</button>
        <Link to="/register">Register</Link>
        <Link to="/basket">Basket</Link>
        <Link to="/user_profile">User Profile</Link>
        <Link to="/restaurants">Restaurant Profile</Link>        
    </Wrapper>
  )
}

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-evenly;
    height: var(--nav-height)
`;

export default Navbar