import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Wishlist from "./components/Wishlist";
import Category from "./components/Category";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        <Route path="/shop" element={<Shop />} />
        <Route path="/wishlist" element={<Wishlist />} /> 
        <Route path="/category" element={<Category />} /> 

      </Routes>
    </Router>
  );
}

export default App;
