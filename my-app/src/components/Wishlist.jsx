// src/components/Wishlist.js
import React from "react";
import Navbar from "../components/HomeComponents/Navbar";
import Footer from "../components/HomeComponents/Footer";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

     

      {/* <Footer /> */}
    </div>
  );
};

export default Wishlist;
