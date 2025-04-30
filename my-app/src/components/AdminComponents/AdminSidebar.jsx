import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 w-64">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      <ul>
        <li className="mb-3">
          <Link to="/admin/dashboard" className="text-white hover:text-gray-400">
            Dashboard
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/vendors" className="text-white hover:text-gray-400">
            Pending Vendors
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin/products" className="text-white hover:text-gray-400">
            Pending Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
