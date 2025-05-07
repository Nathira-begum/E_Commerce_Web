import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import Loader from "../Loader";
import ProductCard from "../ProductCard";
import { motion, AnimatePresence } from "framer-motion";

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ sizes: [], colors: [], tags: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
        else throw new Error("Invalid data format");
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const active = prev[type];
      const newActive = active.includes(value)
        ? active.filter((v) => v !== value)
        : [...active, value];
      return { ...prev, [type]: newActive };
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchSizes =
      filters.sizes.length === 0 ||
      product.sizes?.some((size) => filters.sizes.includes(size));
    const matchColors =
      filters.colors.length === 0 ||
      product.colors?.some((color) => filters.colors.includes(color));
    const matchTags =
      filters.tags.length === 0 ||
      product.tags?.some((tag) => filters.tags.includes(tag));
    return matchSizes && matchColors && matchTags && product.approved;
  });

  const filterOptions = {
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["red", "blue", "white", "black", "green"],
    tags: ["casual", "formal", "trendy", "classic"],
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6 bg-gradient-to-br from-white via-gray-50 to-white min-h-screen">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-4 text-gray-800">
          <FaFilter className="text-pink-600" /> Filter Products
        </h1>

        {/* Filters */}
        <div className="space-y-4">
          {Object.entries(filterOptions).map(([type, options]) => (
            <div key={type} className="flex flex-wrap gap-3">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleFilter(type, option)}
                  className={`px-4 py-2 rounded-full border text-sm transition-all duration-200 shadow-sm ${
                    filters[type].includes(option)
                      ? "bg-pink-600 text-white"
                      : "bg-white hover:bg-pink-50"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Product Grid */}
      <AnimatePresence>
        {filteredProducts.length === 0 ? (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No products match the selected filters.
          </motion.p>
        ) : (
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyProductsPage;
