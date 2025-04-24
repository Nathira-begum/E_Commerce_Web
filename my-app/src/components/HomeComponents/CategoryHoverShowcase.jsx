import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Sample category image data (replace with backend links)
const categories = {
  MEN: [
    "https://images.unsplash.com/photo-1660891950307-a427ea1bebb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVucyUyMGRyZXNzfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1671656349240-c2dac4acfc2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1lbnMlMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
  ],
  WOMEN: [
    "https://images.unsplash.com/photo-1619794724492-651397287d94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW5zJTIwZHJlc3N8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1697663426729-d9ff755ba4ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWVucyUyMGRyZXNzfGVufDB8fDB8fHww",
  ],
  KIDS: [
    "https://images.unsplash.com/photo-1604482858862-1db908a653e4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2lkcyUyMHRyZW5keSUyMGRyZXNzfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1724296697377-b03d8a9ba6fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2lkcyUyMHRyZW5keSUyMGRyZXNzfGVufDB8fDB8fHww",
  ],
  FORMALS: [
    "https://images.unsplash.com/photo-1549991222-24dc894de946?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGZvcm1hbHN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1661661921619-f5230e6902f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW4lMjBmb3JtYWx8ZW58MHx8MHx8fDA%3D",
  ],
  CASUALS: [
    "https://images.unsplash.com/photo-1616325629936-99a9013c29c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdvbWVuJTIwZm9ybWFsfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1670489605175-41b5a37bd03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhc3VhbHMlMjBtZW5zfGVufDB8fDB8fHww",
  ],
};

const getImagePositions = (label) => {
  const index = Object.keys(categories).indexOf(label);
  return {
    left: { top: index % 2 !== 0 },
    right: { top: index % 2 === 0 },
  };
};

const CategoryHoverShowcase = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const handleClick = (label) => {
    navigate("/product", { state: { category: label } });
  };

  return (
    <div className="relative h-[600px] bg-red-700 overflow-hidden flex items-center justify-center px-8">
      {/* Category Text */}
      <div className="z-20 space-y-6 text-white text-4xl font-extrabold text-center">
        {Object.keys(categories).map((label) => (
          <div
            key={label}
            onMouseEnter={() => setHovered(label)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(label)}
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Slide-in Hover Images */}
      <AnimatePresence mode="wait">
        {hovered && (
          <>
            {/* Left image sliding in from the left */}
            <motion.div
              key={`left-${hovered}`}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={`absolute z-10 p-6 ${
                getImagePositions(hovered).left.top ? "top-10" : "bottom-10"
              } left-0`}
            >
              <img
                src={categories[hovered][0]}
                alt=""
                className="w-64 h-96 object-cover rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Right image sliding in from the right */}
            <motion.div
              key={`right-${hovered}`}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className={`absolute z-10 p-6 ${
                getImagePositions(hovered).right.top
                  ? "top-10 right-0"
                  : "bottom-10 right-0"
              }`}
            >
              <img
                src={categories[hovered][1]}
                alt=""
                className="w-64 h-96 object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryHoverShowcase;
