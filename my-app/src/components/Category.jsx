import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaSortAmountDown } from "react-icons/fa";
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";

const filters = {
  size: ["S", "M", "L", "XL"],
  brand: ["Nike", "Adidas", "Puma"],
  color: ["Black", "Red", "Gray"],
  rating: [5, 4, 3, 2],
  offer: ["Buy 2 for 999", "10% OFF"],
  discount: [10, 30, 40],
};

const FilterSection = ({ title, options, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b pb-3 mb-3">
      <div
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
          <h3 className="capitalize text-md font-semibold">{title}</h3>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {isOpen && (
        <div className="mt-2 ml-6 flex flex-col gap-2">
          {options.map((option, idx) => (
            <label key={idx} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(title, option)}
                className="w-4 h-4"
              />
              {title === "rating" ? `${option}★ & up` : option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const SortBox = ({ selectedSort, setSelectedSort, setLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Popularity", "New Arrival", "Price : High to Low", "Price : Low to High"];

  const handleSelect = (option) => {
    setLoading(true);
    setSelectedSort(option);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-4 ml-auto w-fit">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-300 bg-white px-4 py-2 rounded-md shadow-sm flex items-center justify-between text-sm font-medium w-56"
      >
        <FaSortAmountDown className="text-gray-500 mr-2" />
        Sort by: <span className="ml-2 text-black">{selectedSort}</span>
        <ChevronDown className="ml-auto text-gray-500" size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selectedSort === option ? "font-bold text-black" : "text-gray-600"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    brand: [],
    color: [],
    rating: [],
    offer: [],
    discount: [],
  });
  const [selectedSort, setSelectedSort] = useState("Popularity");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setAllProducts(res.data);
      setFilteredProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...allProducts];

      Object.keys(selectedFilters).forEach((key) => {
        if (selectedFilters[key].length > 0) {
          filtered = filtered.filter((product) =>
            selectedFilters[key].includes(product[key])
          );
        }
      });

      if (selectedSort === "Price : High to Low") {
        filtered.sort((a, b) => b.discount - a.discount);
      } else if (selectedSort === "Price : Low to High") {
        filtered.sort((a, b) => a.discount - b.discount);
      }

      setFilteredProducts(filtered);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedFilters, selectedSort, allProducts]);

  const handleCheckboxChange = (filterType, value) => {
    setLoading(true);
    setFilteredProducts([]);
    setSelectedFilters((prev) => {
      const alreadySelected = prev[filterType].includes(value);
      const newFilters = alreadySelected
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];
      return { ...prev, [filterType]: newFilters };
    });
  };

  const handleClearFilters = () => {
    setSelectedFilters({
      size: [],
      brand: [],
      color: [],
      rating: [],
      offer: [],
      discount: [],
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex w-full mt-10">
        <aside className="w-1/4 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={handleClearFilters}
              className="text-sm text-red-600 hover:underline"
            >
              Clear All
            </button>
          </div>
          {Object.entries(filters).map(([type, options]) => (
            <FilterSection
              key={type}
              title={type}
              options={options}
              selected={selectedFilters[type]}
              onChange={handleCheckboxChange}
            />
          ))}
        </aside>

        <main className="w-3/4 p-10">
          <SortBox
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setLoading={setLoading}
          />
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <p className="text-sm text-gray-500 mb-6">{filteredProducts.length} Results</p>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow p-4 rounded-lg text-center flex flex-col"
                >
                  <img
                    src={`${product.image}`}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.size} | {product.brand} | {product.color}
                  </p>
                  <p className="text-sm text-gray-600">
                    {product.offer} | {product.discount}% OFF
                  </p>
                  <div className="mt-auto flex justify-between gap-2 pt-4">
                    <button className="bg-blue-500 text-white flex-1 py-2 rounded text-sm flex justify-center items-center gap-1">
                      <FaShoppingCart /> Cart
                    </button>
                    <button className="bg-red-500 text-white flex-1 py-2 rounded text-sm flex justify-center items-center gap-1">
                      <FaHeart /> Wishlist
                    </button>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                  No categories found
                </p>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
