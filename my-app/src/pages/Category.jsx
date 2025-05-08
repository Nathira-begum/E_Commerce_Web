import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaShoppingCart,
  FaHeart,
  FaImage,
  FaTimesCircle,
} from "react-icons/fa";
import Navbar from "../components/HomeComponents/Navbar";
import Footer from "../components/HomeComponents/Footer";

const FILTERS = {
  size: ["S", "M", "L", "XL"],
  brand: ["Nike", "Adidas", "Puma"],
  color: ["Black", "Red", "Gray"],
  rating: [5, 4, 3, 2],
  offer: ["Buy 2 for 999", "10% OFF"],
  discount: ["10%", "20%", "30%"],
};

const safeParse = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
};

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState(
    Object.fromEntries(Object.keys(FILTERS).map((k) => [k, []]))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Popularity");
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState(safeParse("cartItems"));
  const [wishlistItems, setWishlistItems] = useState(safeParse("wishlist"));

  const fileRef = useRef();

  const fetchProducts = (q = "") => {
    setLoading(true);
    const url = q
      ? `http://localhost:5000/api/products?q=${encodeURIComponent(q)}`
      : `http://localhost:5000/api/products`;

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    let arr = [...products];

    Object.entries(filters).forEach(([k, vals]) => {
      if (vals.length) {
        arr = arr.filter((p) => {
          const val = p[k];
          if (Array.isArray(val)) {
            return val.some((v) => vals.includes(String(v)));
          }
          return vals.includes(String(val));
        });
      }
    });

    if (sortBy === "Price:Low") arr.sort((a, b) => a.price - b.price);
    if (sortBy === "Price:High") arr.sort((a, b) => b.price - a.price);

    setFiltered(arr);
  }, [filters, sortBy, products]);

  const toggleFilter = (k, v) => {
    setFilters((f) => {
      const s = new Set(f[k]);
      s.has(v) ? s.delete(v) : s.add(v);
      return { ...f, [k]: [...s] };
    });
  };

  const clearFilters = () =>
    setFilters(Object.fromEntries(Object.keys(FILTERS).map((k) => [k, []])));

  const clearSearch = () => {
    setSearchQuery("");
    fetchProducts("");
  };

  const onFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("image", file);

    axios
      .post("http://localhost:5000/api/products/image-search", fd)
      .then((res) => {
        const matchedProducts = res.data.products;
        if (!matchedProducts.length) {
          alert("No matching products found");
        }
        setProducts(matchedProducts);
        setFiltered(matchedProducts);
      })
      .catch((err) => {
        console.error(err);
        alert("Error during image search");
      });
  };

  const handleAddToCart = (prod) => {
    if (cartItems.some((x) => x._id === prod._id)) {
      alert("Already in cart");
      return;
    }
    const updated = [...cartItems, { ...prod, quantity: 1 }];
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart_update"));
  };

  const handleToggleWishlist = (prod) => {
    let updated;
    if (wishlistItems.some((x) => x._id === prod._id)) {
      updated = wishlistItems.filter((x) => x._id !== prod._id);
    } else {
      updated = [...wishlistItems, prod];
    }
    setWishlistItems(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlist_update"));
  };

  const inWishlist = (prod) => wishlistItems.some((x) => x._id === prod._id);

  const getDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    const value = parseFloat(discount);
    if (isNaN(value)) return price;
    return Math.round(price - (price * value) / 100);
  };

  return (
    <>
      <Navbar />
      <div className="flex mt-16">
        {/* Sidebar */}
        <aside className="w-1/4 p-6 border-r space-y-4">
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-red-500"
          >
            <FaTimesCircle /> Clear Filters
          </button>
          {Object.entries(FILTERS).map(([k, opts]) => (
            <div key={k}>
              <h4 className="font-bold capitalize">{k}</h4>
              {opts.map((o) => (
                <label key={o} className="block text-sm">
                  <input
                    type="checkbox"
                    checked={filters[k].includes(o)}
                    onChange={() => toggleFilter(k, o)}
                  />
                  <span className="ml-2">
                    {k === "rating" ? `${o}★ & up` : o}
                  </span>
                </label>
              ))}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search…"
                className="w-full border rounded pl-4 pr-10 py-2"
              />
              <button
                onClick={() => fileRef.current.click()}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600"
              >
                <FaImage />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onFile}
                className="hidden"
              />
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                title="Clear search"
              >
                <FaTimesCircle />
              </button>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option>Popularity</option>
              <option value="Price:Low">Price:Low</option>
              <option value="Price:High">Price:High</option>
            </select>
          </div>

          {loading ? (
            <p>Loading…</p>
          ) : (
            <>
              <h2 className="text-2xl mb-4">{filtered.length} Results</h2>
              {filtered.length === 0 ? (
                <p>No matching products found.</p>
              ) : (
                <div className="grid grid-cols-3 gap-6">
                  {filtered.map((p) => {
                    const discountedPrice = getDiscountedPrice(p.price, p.discount);
                    return (
                      <div key={p._id} className="border p-4 rounded">
                        <img
                          src={
                            p.image?.startsWith("http")
                              ? p.image
                              : `http://localhost:5000/uploads/${p.image}`
                          }
                          alt={p.name}
                          className="w-full h-40 object-cover mb-2"
                        />
                        <h3 className="font-semibold">{p.name}</h3>
                        <div className="text-gray-500 text-sm">
                          {p.discount ? (
                            <>
                              <span className="line-through mr-2">${p.price}</span>
                              <span className="text-green-600 font-semibold">
                                ${discountedPrice}
                              </span>
                              <span className="ml-2 text-red-500 text-xs">
                                ({p.discount} OFF)
                              </span>
                            </>
                          ) : (
                            <span>${p.price}</span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="bg-blue-500 text-white flex-1 py-2 rounded flex items-center justify-center gap-2"
                          >
                            <FaShoppingCart /> Add to Cart
                          </button>
                          <button
                            onClick={() => handleToggleWishlist(p)}
                            className={`flex items-center justify-center py-2 px-3 rounded ${
                              inWishlist(p)
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            <FaHeart />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
