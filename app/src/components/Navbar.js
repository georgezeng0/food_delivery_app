import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Navbar = () => {
    return (
      <Wrapper>
        <Link to="/">Landing</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/login">Login/Logout</Link>
        <Link to="/register">Register</Link>
        <Link to="/basket">Basket</Link>
        <Link to="/restaurants">User Profile</Link>
        <Link to="/restaurants">Restaurant Profile</Link>        
    </Wrapper>
  )
}

const Wrapper = styled.nav`
    display: flex;
    justify-content: space-evenly;
`;

export default Navbar