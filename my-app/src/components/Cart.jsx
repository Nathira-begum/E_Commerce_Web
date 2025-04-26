import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(saved);
  }, []);

  // Update localStorage and dispatch event for Navbar
  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cart_update"));
  };

  // Change quantity
  const handleQuantityChange = (id, delta) => {
    const newCart = cartItems.map((item) => {
      if (item._id === id) {
        const q = item.quantity + delta;
        return q > 0 ? { ...item, quantity: q } : item;
      }
      return item;
    });
    updateCart(newCart);
  };

  // Remove item
  const handleRemove = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    updateCart(newCart);
  };

  // Compute total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="mt-16 p-6 md:p-10">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 bg-white p-4 rounded shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-gray-500">{item.brand}</p>
                  <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, +1)}
                      className="p-1 bg-gray-200 rounded"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-500 p-2"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
            <div className="text-right font-bold text-xl">
              Total: ${total.toFixed(2)}
            </div>
            <div className="text-right">
              <button
                onClick={() => navigate("/checkout")}
                className="bg-red-600 text-white px-6 py-3 rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
