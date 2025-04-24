import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [vendor, setVendor] = useState({});
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const vendorId = localStorage.getItem('vendorId');
    const fetchVendor = async () => {
      const res = await axios.get(`http://localhost:5000/api/vendors/${vendorId}`);
      setVendor(res.data);
    };
    const fetchProducts = async () => {
      const res = await axios.get(`http://localhost:5000/api/products/vendor/${vendorId}`);
      setProductCount(res.data.length);
    };
    fetchVendor();
    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Vendor Dashboard</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={vendor.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{vendor.name}</h2>
          <p>Email: {vendor.email}</p>
          <p>Phone: {vendor.phone}</p>
          <p>Total Products: {productCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
