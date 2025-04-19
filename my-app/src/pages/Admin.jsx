import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AddProduct from '../components/AddProduct';
import FlashSale from '../components/FlashSale';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('addProduct');

  const renderContent = () => {
    switch (activeTab) {
      case 'addProduct':
        return <AddProduct />;
      case 'flashSale':
        return <FlashSale />;
      default:
        return <AddProduct />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="flex-grow p-6 ml-56 w-full">{renderContent()}</div>
    </div>
  );
};

export default Admin;
