import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../components/HomeComponents/Navbar";
import axios from "axios";


const Category = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Filter products
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSize = selectedSize ? product.sizes?.includes(selectedSize) : true;
      const matchesColor = selectedColor ? product.colors?.includes(selectedColor) : true;
      const matchesTag = selectedTag ? product.tags?.includes(selectedTag) : true;
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        (minPrice || maxPrice) ? (product.price >= minPrice && product.price <= maxPrice) : true;

      return (
        matchesSize &&
        matchesColor &&
        matchesTag &&
        matchesCategory &&
        matchesSearch &&
        matchesPrice
      );
    });

    setFilteredProducts(filtered);
  }, [
    selectedSize,
    selectedColor,
    selectedTag,
    selectedCategory,
    minPrice,
    maxPrice,
    searchQuery,
    products,
  ]);

  // Handle individual filter
  const handleFilter = (type, value) => {
    if (type === "size") setSelectedSize(value === selectedSize ? null : value);
    if (type === "color") setSelectedColor(value === selectedColor ? null : value);
    if (type === "tag") setSelectedTag(value === selectedTag ? null : value);
    if (type === "category") setSelectedCategory(value === selectedCategory ? null : value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedTag(null);
    setSelectedCategory(null);
    setMinPrice(0);
    setMaxPrice(1000);
    setSearchQuery("");
  };

  return (

    <>
    <Navbar/>
    <div className="flex flex-col lg:flex-row px-4 py-16 gap-4 bg-gray-100 min-h-screen">

      {/* Filter Sidebar */}
      <div className="w-full lg:w-1/4 bg-white rounded-xl p-6 shadow">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <FaFilter className="text-red-600" /> Filters
        </h2>

        {/* Sizes */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Sizes</h3>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <span
                key={size}
                onClick={() => handleFilter("size", size)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  selectedSize === size ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-red-100"
                }`}
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {["red", "blue", "white", "black", "green"].map((color) => (
              <span
                key={color}
                onClick={() => handleFilter("color", color)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  selectedColor === color ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-red-100"
                }`}
              >
                {color}
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {["casual", "formal", "trendy", "classic"].map((tag) => (
              <span
                key={tag}
                onClick={() => handleFilter("tag", tag)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  selectedTag === tag ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-red-100"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Category</h3>
          <div className="flex flex-wrap gap-2">
            {["Shirt", "Pant", "Watch"].map((category) => (
              <span
                key={category}
                onClick={() => handleFilter("category", category)}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  selectedCategory === category ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-red-100"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Price</h3>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm">Up to ${maxPrice}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="Min Price"
            />
            <span>-</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="Max Price"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-black py-2 rounded-lg font-medium"
        >
          Clear Filters
        </button>
      </div>

      {/* Products Grid */}
      <div className="w-full lg:w-3/4">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-gray-500">No products match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition-all"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  loading="lazy"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500 mt-2">${product.price}</p>
                <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full">
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>

    

    </>

   
  );
};

export default Category;
