// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signin from "./components/Signin";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        { <Route path="/signin" element={<Signin />} /> }
      
      </Routes>
    </Router>
    
  );
}

export default App;
