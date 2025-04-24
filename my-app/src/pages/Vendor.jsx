import React, { useState } from 'react';
import VendorSidebar from '../components/VendorComponents/VendorSidebar';
import VendorDashboard from '../components/VendorComponents/VendorDashboard';
import VendorAddProduct from '../components/VendorComponents/VendorAddProduct';
import VendorMyProducts from '../components/VendorComponents/VendorMyProducts';
import VendorOrders from '../components/VendorComponents/VendorOrders';
import VendorEarnings from '../components/VendorComponents/VendorEarnings';
import VendorSettings from '../components/VendorComponents/VendorSettings';

const Vendor = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeTab) {
      case "Dashboard": return <VendorDashboard />;
      case "Add Product": return <VendorAddProduct />;
      case "My Products": return <VendorMyProducts />;
      case "Orders": return <VendorOrders />;
      case "Earnings": return <VendorEarnings />;
      case "Account Settings": return <VendorSettings />;
      case "Logout": return <div className="p-6 text-red-500">You have been logged out.</div>;
      default: return <VendorDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Fixed sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-10">
        <VendorSidebar setActiveTab={setActiveTab} />
      </div>

      {/* Main content area, with left margin to make space for fixed sidebar */}
      <div className="ml-64 flex-1 bg-white min-h-screen p-4 overflow-y-auto">
        {renderComponent()}
      </div>
    </div>
  );
};

export default Vendor;
