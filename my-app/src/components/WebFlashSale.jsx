import React, { useEffect, useState } from 'react';
import { FaHeart, FaEye, FaStar } from 'react-icons/fa';
import axios from 'axios';

const WebFlashSale = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashsale')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching flash sale:', err));
  }, []);

  return (
    <div className="py-10 px-4 md:px-12 bg-white">
      <h2 className="text-2xl font-bold mb-6">🔥 Flash Sale</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white border rounded-lg p-3 shadow-sm relative group">
            
            {/* Discount Badge */}
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{product.discount}%
            </span>

            {/* Icons */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
              <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                <FaHeart className="text-gray-600" />
              </button>
              <button className="bg-white p-1 rounded-full shadow hover:bg-gray-100">
                <FaEye className="text-gray-600" />
              </button>
            </div>

            {/* Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-36 object-contain mb-3"
            />

            {/* Details */}
            <h3 className="text-sm text-gray-800 font-semibold truncate">{product.title}</h3>
            <p className="text-red-600 font-bold text-sm">${product.price}</p>
            <div className="flex text-yellow-400 text-xs mt-1">
              {Array.from({ length: product.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebFlashSale;
