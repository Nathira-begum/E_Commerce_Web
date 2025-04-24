import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Formal Wear',
    desc: 'Elegant styles for professional occasions',
    image: 'https://images.unsplash.com/photo-1520975922071-82984f9bf85b',
  },
  {
    title: 'Casual Collection',
    desc: 'Comfortable styles for everyday wear',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
  },
  {
    title: 'Summer Essentials',
    desc: 'Light and stylish outfits for warm days',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
  },
];

const TrendingCategories = () => {
  return (
    <div className="py-16 bg-black text-white text-center px-4">
      <p className="text-red-500 font-bold uppercase">Discover</p>
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Trending Categories</h2>
      <p className="max-w-xl mx-auto text-gray-300 mb-10">
        Explore our latest collections curated for every occasion. Find the perfect style that matches your personality.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-lg group shadow-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-80 object-cover transform group-hover:scale-105 group-hover:brightness-75 transition duration-500"
            />
            <div className="absolute top-3 right-3 bg-red-600 text-xs px-2 py-1 rounded text-white font-semibold">
              Trending
            </div>
            <div className="absolute bottom-6 left-6 text-left">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-sm text-gray-200 mb-2">{item.desc}</p>
              <button className="text-white font-semibold underline underline-offset-4 hover:text-red-400 transition">
                Shop Collection →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="mt-10 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition">
        View All Products
      </button>
    </div>
  );
};

export default TrendingCategories;
