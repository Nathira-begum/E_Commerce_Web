import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoShareSocial } from "react-icons/io5";
import { GrFavorite } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";


const HomePage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => [product, ...prevItems]);
  };

  const [activeCategory, setActiveCategory] = useState(null);

  const categoryImages = {
    men: ["/icon/men1.jpeg", "/icon/men2.jpeg", "/icon/men3.jpeg"],
    women: ["/icon/women1.jpeg", "/icon/women2.jpeg", "/icon/women3.jpeg"],
    kids: ["/icon/kid1.jpeg", "/icon/kid2.jpeg", "/icon/kid3.jpeg"],
    formals: ["/icon/formal1.jpeg", "/icon/formal2.jpeg", "/icon/formal3.jpeg"],
  };

  const handleCategoryClick = (category) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="w-full">
      {/* Navbar */}
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6 shadow-md sticky top-0 bg-white z-50 font-semibold text-black">
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-4xl font-extrabold font-stylish text-center">
          TRE<span className="text-blue-600">N</span>DIFY
        </h2>

        {/* Left - Navigation */}
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

          <div className="flex items-center border border-gray-300 rounded-md px-2 py-1 w-full max-w-xs bg-white shadow-sm">
            <i className="fas fa-search text-gray-500 text-lg mr-2"></i>
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        </div>

        {/* Right - Icons */}
        <div className="flex gap-9 text-3xl">
          <Link to="/category">
            <BiCategory className="fas fa-heart hover:text-blue-500 cursor-pointer relative top-[-11px]" />
          </Link>
          <Link to="/wishlist">
            <i className="fas fa-heart hover:text-blue-500 cursor-pointer relative top-[-7px]"></i>
          </Link>
          <div className="relative cursor-pointer">
            <i className="fas fa-shopping-cart hover:text-blue-500 text-2xl relative top-[-8px]"></i>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
          <Link to="/signup">
            <i className="fas fa-user-circle hover:text-blue-500 cursor-pointer relative top-[-7px]"></i>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-between bg-blue-900 text-white px-8">
        <div className="w-1/2">
          <img
            src="/icon/fashion.jpeg"
            alt="model"
            className="w-full h-auto shadow-lg"
          />
        </div>
        <div className="w-1/2 pl-10">
          {/* Your content like text, headline, buttons etc */}
          <h1 className="text-4xl font-bold">
            NEW <span className="text-blue-500 italic">Trendy</span> COLLECTION
          </h1>
          <p className="mt-4 text-xl">
            Available <span className="text-blue-500 font-semibold">NOW</span>
          </p>
        </div>
      </section>

      <section className="px-4 py-6 bg-pink-50">
        <h2 className="text-2xl font-bold mb-4">Today's Flash Sales</h2>

        {/* Scrollable product card section */}
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {/* Product Card */}
          {[
            {
              name: "Fastrack",
              price: 120,
              oldPrice: 160,
              img: "/icon/watch.jpeg",
            },
            {
              name: "T-Shirt",
              price: 120,
              oldPrice: 160,
              img: "/icon/tshirt.jpeg",
            },
            {
              name: "Anarkali Kurtis",
              price: 120,
              oldPrice: 160,
              img: "/icon/chudithar.jpeg",
            },
            {
              name: "Men Casual Shoes",
              price: 120,
              oldPrice: 160,
              img: "/icon/shoes1.jpeg",
            },
            {
              name: "Men Fashion",
              price: 120,
              oldPrice: 160,
              img: "/icon/tshirtjeans.jpeg",
            },
            {
              name: "Hoodie",
              price: 120,
              oldPrice: 160,
              img: "/icon/hoodie.jpeg",
            },
            {
              name: "Men Footwear",
              price: 120,
              oldPrice: 160,
              img: "/icon/shoes2.jpeg",
            },

            // Add more products easily here
          ].map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 shadow rounded relative min-w-[250px] flex-shrink-0"
            >
              {/* Discount Badge */}
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                -40%
              </div>

              {/* Heart and Eye Buttons */}
              <div className="absolute top-2 right-2 flex flex-col space-y-2">
                <button className="bg-white p-1 rounded-full shadow">
                  <GrFavorite className="w-5 h-5 text-gray-500" />
                </button>
                <button className="bg-white p-1 rounded-full shadow">
                  <IoShareSocial className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Product Image */}
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-40 object-contain pt-6"
              />

              {/* Product Name */}
              <p className="mt-2 font-semibold">{product.name}</p>

              {/* Prices */}
              <div className="flex items-center space-x-2">
                <span className="text-blue-500 font-bold">
                  ${product.price}
                </span>
                <span className="line-through text-gray-500">
                  ${product.oldPrice}
                </span>
              </div>

              {/* Ratings */}
              <div className="flex items-center mt-1 text-yellow-400">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
                <span className="text-gray-600 text-sm ml-1">(88)</span>
              </div>

              <div className="group mt-2">
                {" "}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 hover:bg-white text-black px-4 py-2 rounded transition duration-300"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="relative bg-blue-900 text-white py-20">
  <div className="flex items-center justify-center gap-16 relative">
    
    {/* Left Preview Image (Always Rendered) */}
    <div className="flex flex-col gap-4 w-48 h-[288px]">
      <img
        src={categoryImages[activeCategory]?.[0]}
        alt="left-img"
        className={`w-48 h-72 object-cover rounded-xl shadow-lg transition-all duration-500 ease-in-out
          ${
            activeCategory
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10 pointer-events-none"
          }`}
      />
    </div>

    {/* Category List */}
    <div className="flex flex-col gap-6 text-4xl font-bold text-center">
      {["men", "women", "kids", "formals"].map((cat) => (
        <div
          key={cat}
          className="relative group cursor-pointer"
          onMouseEnter={() => setActiveCategory(cat)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <span
            className={`transition-all duration-300 transform ${
              activeCategory === cat ? "text-blue-300 scale-110" : ""
            }`}
          >
            {cat.toUpperCase()}
          </span>
        </div>
      ))}
    </div>

    {/* Right Preview Images (Always Rendered) */}
    <div className="flex flex-col gap-4 w-48 h-[600px]">
      <img
        src={categoryImages[activeCategory]?.[1]}
        alt="right-img-1"
        className={`w-48 h-72 object-cover rounded-xl shadow-lg transition-all duration-500 ease-in-out
          ${
            activeCategory
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10 pointer-events-none"
          }`}
      />
      <img
        src={categoryImages[activeCategory]?.[2]}
        alt="right-img-2"
        className={`w-48 h-72 object-cover rounded-xl shadow-lg transition-all duration-500 ease-in-out
          ${
            activeCategory
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10 pointer-events-none"
          }`}
      />
    </div>
  </div>
</section>


      {/* Featured Collections */}
      <section className="bg-white py-16 px-10">
        <h3 className="text-3xl font-bold text-center mb-6">
          Featured Collections
        </h3>
        <p className="text-center text-gray-600 mb-12">
          Discover our carefully selected collections designed for every
          occasion and style preference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Formal Excellence */}
          <div className="relative h-80 rounded-xl overflow-hidden">
            <img
              src="/icon/formal1.jpeg"
              alt="Formal Excellence"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            {/* Content */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h4 className="text-xl font-semibold">Formal Excellence</h4>
              <p className="text-sm mt-1">
                Sophistication and elegance for your professional life. Our
                formal collection features premium suits, blazers, and
                accessories.
              </p>

              <button
                className="mt-2 text-white underline font-semibold"
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 2 - Executive Line 1 */}
          <div className="relative h-80 rounded-xl overflow-hidden">
            <img
              src="/icon/formal2.jpeg"
              alt="Executive Line"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h4 className="text-xl font-semibold">Executive Line</h4>
              <p className="text-sm mt-1">
                Premium attire for leadership positions.
              </p>
              <button
                className="mt-2 text-white underline font-semibold"
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Card 3 - Executive Line 2 */}
          <div className="relative h-80 rounded-xl overflow-hidden">
            <img
              src="/icon/formal3.jpeg"
              alt="Executive Line"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
              <h4 className="text-xl font-semibold">Executive Line</h4>
              <p className="text-sm mt-1">
                Premium attire for leadership positions.
              </p>
              <button
                className="mt-2 text-white underline font-semibold"
                onClick={() => navigate("/shop")}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - moved up */}
      <section className="bg-white pt-8 pb-16 px-10 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Feature 1 */}
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center text-blue-600 text-xl">
              <i className="fas fa-plus"></i>
            </div>
            <h4 className="font-bold text-lg text-blue-900">
              New Arrivals Weekly
            </h4>
            <p className="text-gray-600 mt-2">
              Our collections are updated every week with the latest trends and
              styles.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center text-blue-600 text-xl">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h4 className="font-bold text-lg text-blue-900">Premium Quality</h4>
            <p className="text-gray-600 mt-2">
              All our garments are crafted with the finest materials for lasting
              quality.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center text-blue-600 text-xl">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <h4 className="font-bold text-lg text-blue-900">Free Shipping</h4>
            <p className="text-gray-600 mt-2">
              Enjoy free shipping on all orders over $100. Shop more, save more.
            </p>
          </div>
        </div>

        {/* Seasonal Offer Title */}
        <div className="text-center mt-16">
          <p className="text-blue-600 font-semibold">| LIMITED TIME</p>
          <h2 className="text-3xl font-bold text-blue-900 mt-2">
            Seasonal Offers
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Exclusive deals on our latest collections. Don’t miss these special
            prices available for a limited time only.
          </p>
        </div>
      </section>

      {/* summer sale section */}
      <div
        className="relative bg-contain bg-no-repeat bg-center overflow-hidden min-h-[350px]"
        style={{ backgroundImage: "url('/icon/children.jpeg')" }}
      >
        {/* Overlay (optional) */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Content */}
        <div className="relative z-10 text-white px-6 py-12 md:py-16">
          <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full mb-3 inline-block">
            SUMMER SPECIAL
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Summer Collection 30% off
          </h2>
          <p className="text-base md:text-lg mb-4 max-w-md">
            Refresh your wardrobe with our breathable fabrics and vibrant
            patterns perfect for the season.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/shop"
              className="bg-white text-black text-sm font-semibold px-4 py-2 rounded shadow hover:bg-gray-200 transition"
            >
              Shop Now
            </a>
            <p className="text-sm font-semibold">
              OFFER ENDS IN <br />
              <span className="text-base font-bold">3d : 12h : 45m</span>
            </p>
          </div>
        </div>
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

export default HomePage;
