import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Home from './components/pages/Home';
import ViewCart from './components/pages/ViewCart';
import PdfViewer from './components/PdfContent/PdfViewer';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/Registration' element={<Registration/>} />
        <Route exact path='/view-cart' element={<ViewCart/>} />
        <Route exact path='/pdf-viewer' element={<PdfViewer/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
