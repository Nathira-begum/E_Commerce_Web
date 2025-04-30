import React from 'react';
import MyProducts from './VendorMyProducts';

const MyProductPage = () => {
  const vendorEmail = sessionStorage.getItem('vendorEmail'); // Adjust as per your auth system

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-6">My Products</h1>
      <MyProducts vendorEmail={vendorEmail} />
    </div>
  );
};

export default MyProductPage;
