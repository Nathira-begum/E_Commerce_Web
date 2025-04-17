import React from 'react';
import { motion } from 'framer-motion';
import menImage from '../assets/gabriel-martin-Yy8wzGtjcGo-unsplash (1).jpg';
import womenImage from '../assets/Women.png';
import kidsImage from '../assets/nathan-dumlao-ts8LZD9KVMQ-unsplash.jpg';
import accessoriesImage from '../assets/nab-visuals-xWgowSjY1p8-unsplash.jpg';

const NewArrivals = () => {
    return (
      <div className="px-6 py-10 bg-black">
        <h2 className="text-2xl font-bold text-white mb-6">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Side */}
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="relative h-[500px] overflow-hidden rounded-xl "
          >
            <img src={menImage} alt="Formal for Men" className="w-full h-full object-cover rounded-xl " />
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-xl font-semibold">FORMAL FOR MENS</h3>
              <p className="text-sm">Elevate your wardrobe with our premium suits.</p>
              <button className="mt-2 bg-white text-black px-4 py-1 rounded">Shop Now</button>
            </div>
            
          </motion.div>
  
          {/* Right Side - 40% + 60% split */}
          <div className="flex flex-col gap-4 h-[500px]">
            {/* Top - 40% Height */}
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              className="relative h-[40%] overflow-hidden rounded-xl"
            >
              <img src={womenImage} alt="Women's Collections" className="w-full h-full object-cover rounded-xl" />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-xl font-semibold">Women's Collections</h3>
                <p className="text-sm">Featured woman collections with a unique vibe.</p>
                <button className="mt-2 bg-white text-black px-4 py-1 rounded">Shop Now</button>
              </div>
            </motion.div>
  
            {/* Bottom - 60% Height - 2 Columns */}
            <div className="grid grid-cols-2 gap-4 h-[60%]">
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="relative overflow-hidden rounded-xl"
              >
                <img src={kidsImage} alt="Kids Collection" className="w-full h-full object-cover rounded-xl" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-md font-semibold">Kids Collection</h3>
                  <button className="mt-1 bg-white text-black px-3 py-1 text-sm rounded">Shop Now</button>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                className="relative overflow-hidden rounded-xl"
              >
                <img src={accessoriesImage} alt="Accessories" className="w-full h-full object-cover rounded-xl" />
                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-md font-semibold">Accessories</h3>
                  <button className="mt-1 bg-white text-black px-3 py-1 text-sm rounded">Shop Now</button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default NewArrivals;
  