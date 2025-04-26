import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  // Handle adding items to cart
  const handleAddToCart = (prod) => {
    if (cartItems.some((x) => x._id === prod._id)) {
      alert("Already in cart");
      return;
    }
    const updatedCart = [...cartItems, { ...prod, quantity: 1 }];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart_update"));
    alert("Added to cart");
  };

  // Handle removing item from wishlist
  const handleRemoveFromWishlist = (prod) => {
    const updatedWishlist = wishlistItems.filter((item) => item._id !== prod._id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlist_update"));
  };

  return (
    <>
      <Navbar />
      <div className="mt-20 p-6">
        <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className="text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div key={item._id} className="border p-4 rounded">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-2"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-500">{item.brand}</p>
                <p className="font-bold mt-1">${item.price}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded flex items-center justify-center gap-2"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(item)}
                    className="flex-1 bg-red-500 text-white py-2 rounded flex items-center justify-center gap-2"
                  >
                    <FaHeart /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
