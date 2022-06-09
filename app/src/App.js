import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import { getLocalUser } from './features/userSlice'
import {
  Landing, Login, Restaurants, SingleRestaurant,
  Checkout, Basket, Error, NewRestaurant, NewDish,
  Register, UserProfile, ProtectedRoute
} from './routes'

function App() {
  
  // Check for user
  const { user } = useSelector(state=>state.user)
  
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
        <Route path="/restaurants/:id" element={<SingleRestaurant/>}/>
        <Route path="/restaurants/:id/edit" element={<NewRestaurant/>}/>
        <Route path="/restaurants/:r_id/new_dish" element={<NewDish/>}/>
        <Route path="/dishes/:d_id/edit" element={<NewDish/>}/>
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