import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaThLarge } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  // Load counts from localStorage
  const loadCounts = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setCartCount(cartItems.length);
    setWishlistCount(wishlistItems.length);
  };

  useEffect(() => {
    // load user
    const userData = JSON.parse(localStorage.getItem("user"));
    const oauthUser = JSON.parse(localStorage.getItem("profile"));
    setUser(userData || oauthUser);

    // initial counts
    loadCounts();

    // listen for updates
    window.addEventListener("cart_update", loadCounts);
    window.addEventListener("wishlist_update", loadCounts);
    return () => {
      window.removeEventListener("cart_update", loadCounts);
      window.removeEventListener("wishlist_update", loadCounts);
    };
  }, []);

  const handleProfileClick = () => {
    if (user) setShowDropdown(p => !p);
    else navigate("/signup");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    setUser(null);
    setShowDropdown(false);
    navigate("/signup");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-black h-14 flex justify-between items-center px-20 text-white z-50">
      {/* LEFT */}
      <div className="flex items-center gap-10">
        <Link to="/category-women"><h2>Women</h2></Link>
        <Link to="/category-men"><h2>Men</h2></Link>
        <Link to="/category-kids"><h2>Kids</h2></Link>
        <div className="relative">
          <FaSearch onClick={() => setShowSearch(p => !p)} size={16} className="cursor-pointer"/>
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
        <Link to="/category"><FaThLarge size={20} className="cursor-pointer"/></Link>

        <Link to="/wishlist" className="relative">
          <FaHeart size={20} className="cursor-pointer"/>
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative">
          <FaShoppingCart size={20} className="cursor-pointer"/>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-blue-500 rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        <div className="relative">
          <FaUser onClick={handleProfileClick} size={20} className="cursor-pointer"/>
          {user && showDropdown && (
            <div className="absolute right-0 mt-2 w-60 bg-white text-black shadow-md rounded-md overflow-hidden z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="font-semibold">{user.firstName || user.lastname}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Link to="/myaccount" className="block px-4 py-2 hover:bg-gray-100">My Account</Link>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
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
