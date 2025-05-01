import React, { useState } from "react";
import {
  FaUser,
  FaThLarge,
  FaBox,
  FaMoneyCheckAlt,
  FaWallet,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/HomeComponents/Navbar";
import Footer from '../components/HomeComponents/Footer'

const MyAccount = () => {
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const profile = JSON.parse(localStorage.getItem("profile"));


  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Profile Layout */}
      <div className="flex px-10 py-8 gap-6 mt-10">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-3 font-medium text-gray-700">
            <li>
              <NavLink
                to="/myaccount"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b ${
                    isActive
                      ? "text-black-500 border-black-500 hover:text-red-500"
                      : "border-gray-200 "
                  }`
                }
              >
                <FaThLarge className="text-lg" />
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myorders"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-red-500 "
                  }`
                }
              >
                <FaBox className="text-lg" />
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mypayment"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-red-500 "
                  }`
                }
              >
                <FaMoneyCheckAlt className="text-lg" />
                My Payments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mywallet"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-red-500 "
                  }`
                }
              >
                <FaWallet className="text-lg" />
                My Wallet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myaddress"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-red-500 "
                  }`
                }
              >
                <FaMapMarkerAlt className="text-lg" />
                My Addresses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myprofile"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-red-500 "
                  }`
                }
              >
                <FaUser className="text-lg" />
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4 space-y-6 ">
          <div className="flex justify-between items-center bg-red-50 p-6 rounded-lg shadow border border-red-100">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center text-2xl font-bold text-black">
                {user?.firstName?.[0]?.toUpperCase() || profile?.firstName?.[0]?.toUpperCase() ||"U"}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.firstName || profile?.firstName || "Guest"}
                </p>
                <p className="text-sm text-gray-600">
                  {user?.email || profile?.email|| "Email not available"}
                </p>
                <p className="text-sm text-gray-600">
                  {user?.phone || "Phone not available"}
                </p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => navigate("/myprofile")}
              className="bg-red-400 hover:bg-red-500 text-black font-semibold px-6 py-2 rounded-md shadow"
            >
              EDIT PROFILE
            </button>
          </div>

          {/* Action Boxes */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { title: "My Orders", desc: "View, Modify and Track Orders" },
              { title: "My Payments", desc: "View and Modify Payment Methods" },
              { title: "My Wallet", desc: "Wallet History and Gift Cards" },
              { title: "My Addresses", desc: "Edit, Add or Remove Addresses" },
              { title: "My Profile", desc: "Edit Info and Change Password" },
              { title: "Help & Support", desc: "Reach Out To Us" },
              { title: "Our Story", desc: "Our Story" },
              { title: "Fanbook", desc: "Fanbook" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MyAccount;
