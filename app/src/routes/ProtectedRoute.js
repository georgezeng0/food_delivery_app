import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, user, redirectPath }) => {
    const location = useLocation() // to be able to add state onto Navigate > access elsewhere to redirect
    if (!user.token) {
        return <Navigate to={redirectPath} replace
            state={{ from: location }} />
  }  
  return children ? children: <Outlet/>
}

export default ProtectedRoute