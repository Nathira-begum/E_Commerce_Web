import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden mt-13">
      {/* Background Image */}
      <img
        src="/icon/fashion1.jpeg"
        alt="Fashion Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 min-h-screen"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Discover the Hottest Trends
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl mb-6"
        >
          Shop the latest styles from top brands
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
