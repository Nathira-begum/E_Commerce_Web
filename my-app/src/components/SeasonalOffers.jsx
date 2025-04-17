import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import offerImage from '../assets/Rectangle 70.png';

const SeasonalOffers = () => {
    const calculateTimeLeft = () => {
      const difference = +new Date("2025-04-20T00:00:00") - +new Date();
      let timeLeft = {};
  
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
  
      return timeLeft;
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);
  
    return (
      <div>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
  
        <div className="relative z-10 mx-auto bg-black">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-red-500 font-bold tracking-widest uppercase">Limited Time</p>
            <h2 className="text-4xl md:text-5xl text-white font-bold mt-3">Seasonal Offers</h2>
            <p className="mt-4 text-gray-300 text-sm md:text-base">
              Exclusive deals on our latest collections. Don’t miss these special prices available for a limited time only.
            </p>
          </motion.div>
  
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-100 text-gray-800 p-8 md:p-12 rounded-2xl shadow-md "  className="relative text-white py-20 px-6 md:px-20 bg-cover bg-center rounded-3xl shadow-xl overflow-hidden"
        style={{ backgroundImage: `url(${offerImage})` }}
          >
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">SUMMER SPECIAL</span>
            <h3 className="text-2xl md:text-3xl font-bold mt-4">Summer Collection 30% off</h3>
            <p className="mt-3 text-sm md:text-base">
              Refresh your wardrobe with our breathable fabrics and vibrant patterns perfect for the season.
            </p>
  
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-6">
              <button className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">Shop Now</button>
              <div className="text-sm">
                <p className="text-red-500 font-medium">OFFER ENDS IN</p>
                <p className="font-semibold mt-1">
                  {`${timeLeft.days || 0}d : ${timeLeft.hours || 0}h : ${timeLeft.minutes || 0}m : ${timeLeft.seconds || 0}s`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default SeasonalOffers;