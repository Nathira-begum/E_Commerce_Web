import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaSortAmountDown } from "react-icons/fa";

const categoryData = [
  {
    name: "Batman T-Shirt",
    size: "M",
    brand: "Nike",
    color: "Black",
    rating: 4,
    offer: "Buy 2 for 999",
    discount: 30,
  },
  {
    name: "Adventure Tee",
    size: "L",
    brand: "Adidas",
    color: "Red",
    rating: 5,
    offer: "Buy 2 for 999",
    discount: 40,
  },
  {
    name: "Winter Hoodie",
    size: "XL",
    brand: "Puma",
    color: "Gray",
    rating: 3,
    offer: "10% OFF",
    discount: 10,
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
                className="w-4 h-4 border-gray-400 rounded text-blue-600 focus:ring-blue-500"
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

  const cartItems = []; // Replace with actual cart state or context

  const handleCheckboxChange = (filterType, value) => {
    setLoading(true);
    setFilteredCategories([]); // Optional: show loader without old data
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
    setFilteredCategories([]); // Optional: hide data during load
    setSelectedFilters({
      size: [],
      brand: [],
      color: [],
      rating: [],
      offer: [],
      discount: [],
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      let results = categoryData;

      // Apply filters
      Object.keys(selectedFilters).forEach((key) => {
        if (selectedFilters[key].length > 0) {
          results = results.filter((item) =>
            selectedFilters[key].includes(item[key])
          );
        }
      });

      // Sorting logic
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
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6 shadow-md sticky top-0 bg-white z-50 font-semibold text-black">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-extrabold text-center">
          TRE<span className="text-blue-600">N</span>DIFY
        </h2>
        <div className="flex items-center gap-10 text-lg">
          <a href="#" className="hover:text-blue-600 transition">
            Women
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Men
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Kids
          </a>
          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 bg-white shadow-sm max-w-xs w-full">
            <i className="fas fa-search text-gray-500 text-lg mr-2"></i>
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>
        <div className="flex gap-9 text-3xl">
          <Link to="/category">
            <BiCategory className="hover:text-blue-500 cursor-pointer" />
          </Link>
          <Link to="/wishlist">
            <FaHeart className="hover:text-blue-500 cursor-pointer" />
          </Link>
          <div className="relative cursor-pointer">
            <FaShoppingCart className="hover:text-blue-500 text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
          <Link to="/signup">
            <FaUserCircle className="hover:text-blue-500 cursor-pointer" />
          </Link>
        </div>
      </nav>

      {/* Filter and Categories Section */}
      <div className="flex w-full">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 hover:underline focus:outline-none"
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

        {/* Categories List */}
        <main className="w-3/4 p-6 relative">
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
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white shadow p-6 rounded-lg hover:shadow-lg cursor-pointer text-center text-xl font-medium"
                >
                  {category.name}
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

      {/* Footer */}
      <footer className="bg-blue-900 mt-2 text-white py-10 px-10">
        <h2 className="text-8xl font-extrabold mb-4 text-center font-stylish">
          TRE<span className="text-blue-600">N</span>DIFY
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Company</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Help</h4>
            <ul>
              <li>FAQs</li>
              <li>Returns</li>
              <li>Shipping</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Follow Us</h4>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded w-full text-black"
            />
            <button className="bg-blue-600 w-full mt-2 p-2 rounded font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
