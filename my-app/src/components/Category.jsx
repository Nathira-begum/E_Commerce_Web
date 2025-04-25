import React, { useState, useEffect } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaSortAmountDown } from "react-icons/fa";
import Navbar from "./HomeComponents/Navbar";
import Footer from "../components/HomeComponents/Footer";

const categoryData = [
  {
    name: "Batman T-Shirt",
    size: "M",
    brand: "Nike",
    color: "Black",
    rating: 4,
    offer: "Buy 2 for 999",
    discount: 30,
    image: "",
  },
  {
    name: "Adventure Tee",
    size: "L",
    brand: "Adidas",
    color: "Red",
    rating: 5,
    offer: "Buy 2 for 999",
    discount: 40,
    image: "adventure.png",
  },
  {
    name: "Winter Hoodie",
    size: "XL",
    brand: "Puma",
    color: "Gray",
    rating: 3,
    offer: "10% OFF",
    discount: 10,
    image: "hoodie.png",
  },
];

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
            <label
              key={idx}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(title, option)}
                className="w-4 h-4 border-gray-400 rounded text-red-600 focus:ring-red-500"
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
  const options = [
    "Popularity",
    "New Arrival",
    "Price : High to Low",
    "Price : Low to High",
  ];

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
        <FaSortAmountDown className="text-gray-500 mr-2 relative top-[2px]" />
        Sort by: <span className="ml-2 text-black">{selectedSort}</span>
        <ChevronDown className="ml-auto text-gray-500" size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option, index) => (
            <label
              key={index}
              className={`block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selectedSort === option
                  ? "font-bold text-black"
                  : "text-gray-600"
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    size: [],
    brand: [],
    color: [],
    rating: [],
    offer: [],
    discount: [],
  });

  const [filteredCategories, setFilteredCategories] = useState(categoryData);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const handleCheckboxChange = (filterType, value) => {
    setLoading(true);
    setFilteredCategories([]);
    setSelectedFilters((prev) => {
      const alreadySelected = prev[filterType].includes(value);
      const newFilters = alreadySelected
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value];
      return { ...prev, [filterType]: newFilters };
    });
  };

  const handleClearFilters = () => {
    setLoading(true);
    setFilteredCategories([]);
    setSelectedFilters({
      size: [],
      brand: [],
      color: [],
      rating: [],
      offer: [],
      discount: [],
    });
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems((prev) => [...prev, product]);
    // navigate("/wishlist");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      let results = categoryData;

      Object.keys(selectedFilters).forEach((key) => {
        if (selectedFilters[key].length > 0) {
          results = results.filter((item) =>
            selectedFilters[key].includes(item[key])
          );
        }
      });

      if (selectedSort === "Price : High to Low") {
        results = [...results].sort((a, b) => b.discount - a.discount);
      } else if (selectedSort === "Price : Low to High") {
        results = [...results].sort((a, b) => a.discount - b.discount);
      }

      setFilteredCategories(results);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [selectedFilters, selectedSort]);

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar/>

      <div className="flex w-full mt-10">
        <aside className="w-1/4 bg-white p-10 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={handleClearFilters}
              className="text-sm text-red-600 hover:underline focus:outline-none"
            >
              Clear All
            </button>
          </div>
          {Object.entries(filters).map(([filterType, options]) => (
            <FilterSection
              key={filterType}
              title={filterType}
              options={options}
              selected={selectedFilters[filterType]}
              onChange={handleCheckboxChange}
            />
          ))}
        </aside>

        <main className="w-3/4 p-10 relative">
          <SortBox
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setLoading={setLoading}
          />

          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <p className="text-sm text-gray-500 mb-6">
            {filteredCategories.length} Results
          </p>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white shadow p-4 rounded-lg hover:shadow-lg text-center flex flex-col"
                >
                  <img
                    src={`/icons/${category.image}`}
                    alt={category.name}
                    className="w-full h-40 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {category.size} | {category.brand} | {category.color}
                  </p>
                  <p className="text-sm text-gray-600">
                    {category.offer} | {category.discount}% OFF
                  </p>
                  <div className="mt-auto flex justify-between gap-2 pt-4">
                    <button
                      onClick={() => handleAddToCart(category)}
                      className="bg-blue-500 text-white flex-1 py-2 rounded text-sm flex justify-center items-center gap-1"
                    >
                      <FaShoppingCart /> Cart
                    </button>
                    <button
                      onClick={() => handleAddToWishlist(category)}
                      className="bg-red-500 text-white flex-1 py-2 rounded text-sm flex justify-center items-center gap-1"
                    >
                      <FaHeart /> Wishlist
                    </button>
                  </div>
                </div>
              ))}
              {filteredCategories.length === 0 && (
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
