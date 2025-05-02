import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import LoginPage from './Login/LoginPage'
import HomePage from './Home/Homepage';
import Assessment from './Assessment/Assessment';
import ResultPage from './Assessment/Result';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
