import React from 'react';
import { motion } from 'framer-motion';
import menImage from '../assets/gabriel-martin-Yy8wzGtjcGo-unsplash (1).jpg';
import womenImage from '../assets/nathan-dumlao-ts8LZD9KVMQ-unsplash.jpg';
import kidsImage from '../assets/nab-visuals-xWgowSjY1p8-unsplash.jpg';
import accessoriesImage from '../assets/nab-visuals-xWgowSjY1p8-unsplash.jpg';
import { ShieldCheck, Truck, PlusCircle } from 'lucide-react';

const FeaturedCollections = () => {
    return (
      <div className="px-6 py-14 bg-black">
        <div className="text-center mb-10">
          <p className="text-sm text-red-600 font-semibold">CURATED FOR YOU</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Signature Collections</h2>
          <p className="mt-2 text-white max-w-xl mx-auto">
            Curated designs to elevate your wardrobe — discover bold and refined styles for every persona.
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left Featured Block */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative h-[500px] overflow-hidden rounded-2xl shadow-md"
          >
            <img 
              src={menImage} 
              alt="Formal Excellence" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-6 left-6 text-white max-w-sm">
              <h3 className="text-2xl font-semibold tracking-wide">Urban Powerline</h3>
              <p className="mt-2 text-sm text-gray-200">
                Command the boardroom and beyond — discover tailored suits, refined fits, and bold statement pieces.
              </p>
              <button className="mt-4 px-4 py-2 bg-white text-blue-900 font-semibold rounded-md hover:bg-blue-100 transition-all">
                Explore Collection →
              </button>
            </div>
          </motion.div>
  
          {/* Right Grid Items */}
          <div className="grid grid-rows-2 gap-6 h-[500px]">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl shadow-md"
            >
              <img 
                src={womenImage} 
                alt="Empower Style" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-lg font-semibold">Empower Style</h3>
                <p className="text-sm text-gray-200">Confident looks crafted for modern women making moves.</p>
                <button className="mt-2 text-sm underline">Shop Now ›</button>
              </div>
            </motion.div>
  
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden rounded-2xl shadow-md"
            >
              <img 
                src={accessoriesImage} 
                alt="Final Touch" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-lg font-semibold">Final Touch</h3>
                <p className="text-sm text-gray-200">Minimalist accents that complete your signature aesthetic.</p>
                <button className="mt-2 text-sm underline">Shop Now ›</button>
              </div>
            </motion.div>
          </div>
        </div>
  
        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 text-center">
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <div className="mx-auto w-10 h-10 mb-3 text-red-600">
              <PlusCircle className="w-full h-full" />
            </div>
            <h4 className="font-semibold text-white mb-1">New Arrivals Weekly</h4>
            <p className="text-sm text-white">Our collections are updated every week with the latest trends and styles.</p>
          </div>
  
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <div className="mx-auto w-10 h-10 mb-3 text-red-600">
              <ShieldCheck className="w-full h-full" />
            </div>
            <h4 className="font-semibold text-white mb-1">Premium Quality</h4>
            <p className="text-sm text-white">All our garments are crafted with the finest materials for lasting quality.</p>
          </div>
  
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <div className="mx-auto w-10 h-10 mb-3 text-red-600">
              <Truck className="w-full h-full" />
            </div>
            <h4 className="font-semibold text-white mb-1">Free Shipping</h4>
            <p className="text-sm text-white">Enjoy free shipping on all orders over $100. Shop more, save more.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default FeaturedCollections;
  
