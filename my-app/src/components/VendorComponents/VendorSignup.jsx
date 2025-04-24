import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [vendor, setVendor] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/vendors/register', vendor);
      alert(res.data.message || 'Signup successful');
      setVendor({ username: '', email: '', password: '' }); // clear inputs
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Vendor Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          name="username"
          value={vendor.username}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Username"
        />
        <input
          name="email"
          value={vendor.email}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Email"
          type="email"
        />
        <input
          name="password"
          value={vendor.password}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Password"
          type="password"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
