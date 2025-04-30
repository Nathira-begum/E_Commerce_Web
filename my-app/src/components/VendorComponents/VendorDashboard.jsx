import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", value: 2 },
  { name: "Feb", value: 8 },
  { name: "Mar", value: 15 },
  { name: "Apr", value: 30 },
  { name: "May", value: 17 },
  { name: "Jun", value: 33 },
  { name: "Jul", value: 27 },
  { name: "Aug", value: 28 },
  { name: "Sep", value: 25 },
  { name: "Oct", value: 32 },
  { name: "Nov", value: 29 },
  { name: "Dec", value: 31 }
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/vendor/login");

    fetch("http://localhost:5000/api/products/vendor", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  useEffect(() => {
    const vendorData = localStorage.getItem("vendor");
    if (vendorData) {
      setUser(JSON.parse(vendorData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vendor");
    window.location.href = "/vendor/login"; // Redirect to login or home
  };

  return (
    <motion.div className="p-6" initial="hidden" animate="visible" variants={fadeUp}>
      {/* Header */}
      <motion.div className="flex justify-between items-center mb-6" variants={fadeUp} custom={0.1}>
        <div>
          <h1 className="text-xl font-bold">Hi, {user?.name || "Vendor"}</h1>
          <p className="text-sm text-gray-500">Here’s what’s happening in your store today</p>
        </div>
        <div className="relative flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <i className="fas fa-bell text-gray-500"></i>
          </div>
          {/* Profile Image with Dropdown */}
          <div className="relative">
            <img
              src={user?.profile || "https://i.pravatar.cc/300"}
              alt="profile"
              className="w-10 h-10 rounded-full border cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Products", value: 250, color: "text-teal-500", icon: "fa-box" },
          { label: "Completed Order", value: 190, color: "text-green-500", icon: "fa-check-circle" },
          { label: "Cancelled Order", value: 15, color: "text-red-500", icon: "fa-times-circle" }
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            className="bg-white shadow-md p-4 rounded-lg"
            variants={fadeUp}
            custom={idx + 1}
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-2 rounded">
                <i className={`fas ${item.icon} text-gray-600`}></i>
              </div>
              <div>
                <p className="text-sm">{item.label}</p>
                <p className={`text-lg font-semibold ${item.color}`}>{item.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sales Report */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        variants={fadeUp}
        custom={4}
      >
        <h2 className="text-lg font-semibold mb-2">Your Sales Report</h2>
        <p className="text-sm text-gray-500 mb-4">Look at your sale</p>
        <motion.div
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          ₹ 5,00,000
        </motion.div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 35]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00d2ff"
              strokeWidth={3}
              dot={{ r: 4 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
