import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { getLocalUser } from './features/userSlice'
import axios from 'axios'
import {
  Landing, Login, Restaurants, SingleRestaurant,
  Checkout, Basket, Error, NewRestaurant, NewDish,
  Register, UserProfile, ProtectedRoute
} from './routes'

function App() {
  
  // Check for user
  const { user } = useSelector(state => state.user)
  
  // Axios authorisation config
  axios.interceptors.request.use(
    request => {
      if (user.token) {
        request.headers['Authorization']=`Bearer ${user.token}`
      }
    return request
  },
    error => {
    
    return Promise.reject(error)
  })
  
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/restaurants" element={<Restaurants/>}/>
        <Route path="/restaurants/create" element={
          <ProtectedRoute user={user} redirectPath='/login'>
            <NewRestaurant />
            </ProtectedRoute>
        } />
        <Route path="/restaurants/:r_id" element={<SingleRestaurant />} />
        <Route path="/restaurants/:r_id/edit" element={
          <ProtectedRoute user={user} redirectPath='/login' authOwner>
            <NewRestaurant />
            </ProtectedRoute>
        } />
        <Route path="/restaurants/:r_id/new_dish" element={
          <ProtectedRoute user={user} redirectPath='/login' authOwner>
            <NewDish />
            </ProtectedRoute>} />
        <Route path="/dishes/:d_id/edit" element={
          <ProtectedRoute user={user} redirectPath='/login' authOwner>
            <NewDish />
            </ProtectedRoute>} />
        <Route path="/basket" element={<Basket/>}/>
        <Route path="/checkout" element={
          <ProtectedRoute user={user} redirectPath='/login'>
            <Checkout />
            </ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user_profile" element={
          <ProtectedRoute user={user} redirectPath='/login'>
            <UserProfile />
            </ProtectedRoute>} />
        <Route path="*" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App