import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import {
  FaUser,
  FaThLarge,
  FaBox,
  FaMoneyCheckAlt,
  FaWallet,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const MyAccount = () => {
  const [cartItems] = useState([1, 2]); // Dummy cart items

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6 shadow-md sticky top-0 bg-white z-50 font-semibold text-black">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-extrabold text-center">
          TRE<span className="text-blue-600">N</span>DIFY
        </h2>
        <div className="flex items-center gap-10 text-lg">
          <a href="#" className="hover:text-blue-600 transition">
            Women
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Men
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Kids
          </a>
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs bg-white shadow-sm">
            <i className="fas fa-search text-gray-500 text-lg mr-2"></i>
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>
        <div className="flex gap-9 text-3xl">
          <Link to="/category">
            <BiCategory className="hover:text-blue-500 cursor-pointer relative top-[-3px]" />
          </Link>
          <Link to="/wishlist">
            <i className="fas fa-heart hover:text-blue-500 cursor-pointer relative top-[-8px]"></i>
          </Link>
          <div className="relative cursor-pointer">
            <i className="fas fa-shopping-cart hover:text-blue-500 text-2xl relative top-[-9px]"></i>
          </div>
          <Link to="/signup">
            <i className="fas fa-user-circle hover:text-blue-500 cursor-pointer relative top-[-9px]"></i>
          </Link>
        </div>
      </nav>

      {/* Profile Layout */}
      <div className="flex px-10 py-8 gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-3 font-medium text-gray-700">
            <li>
              <NavLink
                to="/myaccount"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b ${
                    isActive
                      ? "text-black-500 border-black-500 hover:text-blue-500"
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
                      : "text-gray-700 border-gray-200 hover:text-blue-500 "
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
                      : "text-gray-700 border-gray-200 hover:text-blue-500 "
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
                      : "text-gray-700 border-gray-200 hover:text-blue-500 "
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
                      : "text-gray-700 border-gray-200 hover:text-blue-500 "
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
                      : "text-gray-700 border-gray-200 hover:text-blue-500 "
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
        <div className="w-3/4 space-y-6">
          <div className="flex justify-between items-center bg-blue-50 p-6 rounded-lg shadow border border-blue-100">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-2xl font-bold text-black">
                N
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">Nathira</p>
                <p className="text-sm text-gray-600">
                  nathirabegum734@gmail.com
                </p>
                <p className="text-sm text-gray-600">6382974676</p>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="bg-blue-400 hover:bg-blue-500 text-black font-semibold px-6 py-2 rounded-md shadow">
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
      <footer className="bg-blue-900 mt-2 text-white py-10 px-10">
        <h2 className="text-8xl font-extrabold mb-4 text-center font-stylish">
          TRE<span className="text-blue-600">N</span>DIFY
        </h2>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Company</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Help</h4>
            <ul>
              <li>FAQs</li>
              <li>Returns</li>
              <li>Shipping</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Follow Us</h4>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded w-full text-black"
            />
            <button className="bg-blue-600 w-full mt-2 p-2 rounded font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyAccount;
