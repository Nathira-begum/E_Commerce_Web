import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      {/* Navbar */}
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-10 py-6 shadow-md sticky top-0 bg-white z-50 font-semibold text-black">
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
          <i className="fas fa-search text-3xl cursor-pointer hover:text-blue-600 transition"></i>
        </div>

        <img
          src="/icon/Trendify.jpeg"
          alt="Center Icon"
          className="w-50 h-50 object-contain"
        />

        {/* Right - Icons */}
        <div className="flex gap-6 text-3xl">
          <i className="fas fa-heart hover:text-blue-500 cursor-pointer"></i>
          <i className="fas fa-shopping-cart hover:text-blue-500 cursor-pointer"></i>
          <i className="fas fa-user-circle hover:text-green-500 cursor-pointer"></i>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[100vh] flex items-center justify-end bg-blue-900 text-white px-10">
        <img
          src="/icon/Frame 9.jpeg"
          alt="model"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
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
              <div className="absolute top-2 right-2 space-y-2">
                <button className="bg-white p-1 rounded-full shadow">
                  <span role="img" aria-label="heart">
                    🤍
                  </span>
                </button>
                <button className="bg-white p-1 rounded-full shadow">
                  <span role="img" aria-label="eye">
                    👁️
                  </span>
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
                {/* Add margin-top here for gap */}
                <button className="ml-4 text-blue-500 group-hover:text-black font-semibold border-2 border-blue-500 group-hover:border-black px-3 py-1 rounded">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="bg-blue-600 text-white text-center py-8">
        <h3 className="text-xl font-bold">
          MEN | WOMEN | KIDS | FORMALS | CASUALS
        </h3>
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
