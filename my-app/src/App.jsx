import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./pages/Home"
import Shop from "./components/Shop";
import Wishlist from "./components/Wishlist";
import Category from "./components/Category";
import Admin from "./pages/Admin";
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/wishlist" element={<Wishlist />} /> 
        <Route path="/category" element={<Category />} /> 
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>

      </Routes>
    </Router>
  );
}

export default App;
