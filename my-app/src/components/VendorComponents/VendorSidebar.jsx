import React from 'react';

const Sidebar = ({ setActiveTab }) => {
  const menuItems = [
    "Dashboard",
    "Add Product",
    "My Products",
    "Orders",
    "Earnings",
    "Account Settings",
    "Logout"
  ];

  return (
    <div className="w-64 h-screen bg-red-700 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Vendor Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item}
            className="cursor-pointer hover:text-blue-400 transition"
            onClick={() => setActiveTab(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
