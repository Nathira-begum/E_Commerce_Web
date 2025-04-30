import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VendorSignup() {
  const navigate = useNavigate(); // Initialize the navigate function

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    shopName: "",
    address: "",
    status: "pending" // default status
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/vendor/signup", form);
      alert("Signup successful! Please login.");
      navigate("/vendorlogin");  // Use navigate to redirect to login page
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Vendor Signup</h2>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required />
        <input name="shopName" placeholder="Shop Name" onChange={handleChange} required />
        <input name="address" placeholder="Address" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        <div className="nav-link">
          <span>Already have an account? <a href="/vendorlogin">Login</a></span>
        </div>
      </form>
    </div>
  );
}
