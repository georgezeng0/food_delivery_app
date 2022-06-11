import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import Error from './Error'
import { Loading } from '../components'

const ProtectedRoute = ({ children, user, redirectPath, authOwner }) => {
    const location = useLocation() // to be able to add state onto Navigate > access elsewhere to redirect
    const { r_id } = useParams();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchOwner = async () => {
        axios(`/api/restaurants/${r_id}/owner`)
            .then(res => {
                if (res.data.owner === user.email) {
                    
                    setIsAuth(true);
                    setIsLoading(false);
                }
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                console.log(err);
            })
    }
    useEffect(() => {
        if (authOwner) {
            setIsLoading(true)
            fetchOwner()
        }
    }, [])
    
    // If not logged in > redirect
    if (!user.token) {
        return <Navigate to={redirectPath} replace
            state={{ from: location }} />
    }

    if (isLoading) {
        return <Loading />
    }

    // Once owner is checked with server > check if current user authorised
    return !isLoading && (authOwner ? (isAuth ?
        (children ? children : <Outlet />) :
        <Error code='403' />) :
        (children ? children : <Outlet />)
)
}
        

export default ProtectedRoute