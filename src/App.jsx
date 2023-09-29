import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Home from './components/pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/Registration' element={<Registration/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
