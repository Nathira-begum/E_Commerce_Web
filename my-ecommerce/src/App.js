import React, { useState } from "react";

const products = [
  { id: 1, name: "Shoes", price: 50000 },
  { id: 2, name: "Phone", price: 30000 },
  { id: 3, name: "laptops", price: 5000},
];

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">E-Commerce Store</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md text-center">
            <img src={product.image} alt={product.name} className="w-full mb-2" />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-6">Cart ({cart.length})</h2>
      <ul className="mt-2">
        {cart.map((item, index) => (
          <li key={index} className="border p-2 rounded my-2">
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
