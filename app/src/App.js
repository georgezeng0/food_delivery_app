import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Landing, Login, Restaurants, SingleRestaurant, Checkout, Basket, Error} from './routes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/restaurants" element={<Restaurants/>}/>
        <Route path="/restaurants/:id" element={<SingleRestaurant/>}/>
        <Route path="/order" element={<Basket/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<Error/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App