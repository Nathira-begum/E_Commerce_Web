// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signin from "./components/Signin";
import Home from "./Pages/Home";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Login />} />
         <Route path="/signin" element={<Signin />} /> 
      
      </Routes>
    </Router>
    
  );
}

export default App;
