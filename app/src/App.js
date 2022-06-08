import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components'
import {
  Landing, Login, Restaurants, SingleRestaurant,
  Checkout, Basket, Error, NewRestaurant, NewDish
} from './routes'

function App() {

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/restaurants" element={<Restaurants/>}/>
        <Route path="/restaurants/create" element={<NewRestaurant/>}/>
        <Route path="/restaurants/:id" element={<SingleRestaurant/>}/>
        <Route path="/restaurants/:id/edit" element={<NewRestaurant/>}/>
        <Route path="/restaurants/:r_id/new_dish" element={<NewDish/>}/>
        <Route path="/dishes/:d_id/edit" element={<NewDish/>}/>
        <Route path="/basket" element={<Basket/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App