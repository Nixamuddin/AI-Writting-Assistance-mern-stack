import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import About from './components/About'
import Editor from './components/Editor'
import Home from './components/Home'

function App() {
  return (
    <>
      <BrowserRouter>
    
          <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About />} />
          <Route path='/write' element={<Editor />} />
        </Routes>
      
      </BrowserRouter>
    
    </>
  )
}

export default App
