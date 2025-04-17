import React, { useState } from 'react';
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-black h-14 flex justify-between items-center px-20 text-white z-50">

      {/* LEFT: Women, Men, Kids, Search */}
      <div className="flex items-center gap-10">
        <h2 className="cursor-pointer hover:text-gray-300">Women</h2>
        <h2 className="cursor-pointer hover:text-gray-300">Men</h2>
        <h2 className="cursor-pointer hover:text-gray-300">Kids</h2>

        {/* Search icon and input */}
        <div className="relative">
          <FaSearch
            size={16}
            className="cursor-pointer hover:text-gray-300"
            onClick={() => setShowSearch(!showSearch)}
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

      {/* CENTER: Brand */}
      <div className="text-lg font-bold">Tre<span className='text-red-600'>n</span>dify</div>

      {/* RIGHT: Icons */}
      <div className="flex items-center gap-10">
        <FaShoppingCart size={20} className="cursor-pointer hover:text-gray-300" />
        <FaHeart size={20} className="cursor-pointer hover:text-gray-300" />
        <Link to="/profile">
          <FaUser size={20} className="cursor-pointer hover:text-gray-300" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
