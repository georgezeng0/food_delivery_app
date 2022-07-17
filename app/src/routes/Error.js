import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {BiErrorCircle} from 'react-icons/bi'

const Error = ({ code = '404' }) => {
  const [message, setMessage] = useState('Page not found.')

  useEffect(() => {
    if (code === '403') {
      setMessage('Unauthorised access to this page. Your login may have expired.')
    }
    if (code === '500') {
      setMessage('Internal Server Error')
    }
  }, [])

  return (
    <Wrapper>
      <span className='error-icon'>
        <BiErrorCircle />
        </span>
      <h1>{code}</h1>
      <h4>Error - {message}</h4>
      <Link to='/restaurants'>Back to Restaurants</Link>
    </Wrapper>
  )
}
const Wrapper = styled.main`
padding: var(--nav-height) 0px;
height: 100vh;
box-sizing: border-box;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
.error-icon{
  font-size: 15rem;
  color: var(--red-dark);
  display: flex;
}
h1{
  margin: 0px;
  text-decoration: underline;
}
`

export default Error