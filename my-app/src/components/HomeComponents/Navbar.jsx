import React, { useEffect, useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaThLarge,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const oauthUser = JSON.parse(localStorage.getItem("profile")); // Google/Facebook OAuth user
    if (userData) {
      setUser(userData);
    } else if (oauthUser) {
      setUser(oauthUser);
    }
  }, []);

  const handleProfileClick = () => {
    console.log("User:", user);
    if (user) {
      setShowDropdown((prev) => !prev);
    } else {
      navigate("/signup");
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("profile"); // Remove OAuth login too
    setUser(null);
    setShowDropdown(false);
    navigate("/signup");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black h-14 flex justify-between items-center px-20 text-white z-50">
      {/* LEFT */}
      <div className="flex items-center gap-10">
        <Link to="/category-women">
          <h2 className="cursor-pointer hover:text-gray-300">Women</h2>
        </Link>
        <Link to="/category-men">
          <h2 className="cursor-pointer hover:text-gray-300">Men</h2>
        </Link>
        <Link to="/category-kids">
          <h2 className="cursor-pointer hover:text-gray-300">Kids</h2>
        </Link>
        <div className="relative">
          <FaSearch
            size={16}
            className="cursor-pointer hover:text-gray-300"
            onClick={() => setShowSearch((p) => !p)}
          />
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className="absolute top-8 left-0 p-1 rounded-md bg-white text-black text-sm w-36"
              autoFocus
            />
          )}
        </div>
      </div>

      {/* CENTER */}
      <div className="text-4xl font-bold">
        Tre<span className="text-red-600">n</span>dify
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-10">
        <Link to="/category">
          <FaThLarge size={20} className="cursor-pointer hover:text-gray-300" />
        </Link>
        <Link to="/wishlist">
          <FaHeart size={20} className="cursor-pointer hover:text-gray-300" />
        </Link>
        <Link to="/cart">
          <FaShoppingCart
            size={20}
            className="cursor-pointer hover:text-gray-300"
          />
        </Link>

        {/* Profile Icon + Dropdown */}
        <div className="relative">
          <FaUser
            size={20}
            className="cursor-pointer hover:text-gray-300"
            onClick={handleProfileClick}
          />
          {user && showDropdown && (
            <div className="absolute right-0 mt-2 w-60 bg-white text-black shadow-md rounded-md overflow-hidden z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-semibold">
                  {user.firstName || user.lastname}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Link
                to="/myaccount"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                My Account
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
