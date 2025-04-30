import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VendorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/vendor/login", form);
      localStorage.setItem("vendorToken", res.data.token);
      localStorage.setItem("vendor", JSON.stringify(res.data.vendor));
      alert("Login successful");
      navigate("/vendor"); // Redirect to vendor dashboard or main page after login
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Vendor Login</h2>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <div className="nav-link">
          <span>Don't have an account? <a href="/vendorsignup">Sign Up</a></span>
        </div>
      </form>
    </div>
  );
}
