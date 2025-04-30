import React from "react";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow p-6">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <p>Welcome to the admin panel! You can manage vendors and products here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
