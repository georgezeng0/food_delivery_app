import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
    

    <main>
      <h1>{code}</h1>
      <h4>Error - {message}</h4>
      <Link to='/restaurants'>Back to Restaurants</Link>
    </main>
  )
}

export default Error