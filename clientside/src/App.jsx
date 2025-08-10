import React from 'react'
import LandingPage from './suby/pages/LandingPage'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import ProductMenu from './suby/components/ProductMenu'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/products/:firmId/:firmName' element={<ProductMenu/>}/>
    </Routes>
  )
}

export default App
