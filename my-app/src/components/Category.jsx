import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaSortAmountDown } from "react-icons/fa";
import Navbar from "./HomeComponents/Navbar";
import Footer from "./HomeComponents/Footer";

const filters = {
  size: ["S","M","L","XL"],
  brand: ["Nike","Adidas","Puma"],
  color: ["Black","Red","Gray"],
  rating: [5,4,3,2],
  offer: ["Buy 2 for 999","10% OFF"],
  discount: [10,30,40],
};

const FilterSection = ({ title, options, selected, onChange }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b pb-3 mb-3">
      <div className="flex justify-between items-center cursor-pointer py-2" onClick={()=>setOpen(o=>!o)}>
        <h3 className="font-semibold capitalize">{title}</h3>
        {open ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
      </div>
      {open && (
        <div className="ml-4 flex flex-col gap-2">
          {options.map((opt,i)=>(
            <label key={i} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={()=>onChange(title,opt)}
                className="w-4 h-4"
              />
              {title==="rating" ? `${opt}★ & up` : opt}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

const SortBox = ({ selectedSort, setSelectedSort, setLoading }) => {
  const [open, setOpen] = useState(false);
  const opts = ["Popularity","New Arrival","Price : High to Low","Price : Low to High"];
  return (
    <div className="relative mb-4 ml-auto w-fit">
      <button onClick={()=>setOpen(o=>!o)} className="border px-4 py-2 bg-white flex items-center">
        <FaSortAmountDown className="mr-2"/> Sort by: {selectedSort}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg z-10">
          {opts.map((opt,i)=>(
            <div
              key={i}
              className={`px-4 py-2 cursor-pointer ${opt===selectedSort?"font-bold":""}`}
              onClick={()=>{
                setLoading(true);
                setSelectedSort(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filtersState, setFiltersState] = useState({
    size:[],brand:[],color:[],rating:[],offer:[],discount:[] });
  const [sortBy, setSortBy] = useState("Popularity");
  const [loading, setLoading] = useState(true);

  // cart & wishlist
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems"))||[]
  );
  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem("wishlist"))||[]
  );

  // fetch products
  useEffect(()=>{
    axios.get("http://localhost:5000/api/products")
      .then(res=>{
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(console.error);
  },[]);

  // filter & sort
  useEffect(()=>{
    setLoading(true);
    let arr = [...products];
    Object.keys(filtersState).forEach(key=>{
      if(filtersState[key].length){
        arr = arr.filter(p=>filtersState[key].includes(p[key]));
      }
    });
    if(sortBy==="Price : High to Low") arr.sort((a,b)=>b.price-a.price);
    if(sortBy==="Price : Low to High") arr.sort((a,b)=>a.price-a.price);
    setFiltered(arr);
    setLoading(false);
  },[filtersState,sortBy,products]);

  const toggleFilter = (key,val)=>{
    setFiltersState(fs=>{
      const copy = {...fs};
      if(copy[key].includes(val)) copy[key]=copy[key].filter(x=>x!==val);
      else copy[key].push(val);
      return copy;
    });
  };

  const handleAddToCart = prod => {
    if(cartItems.some(x=>x._id===prod._id)){
      alert("Already in cart"); return;
    }
    const c = [...cartItems, {...prod,quantity:1}];
    setCartItems(c);
    localStorage.setItem("cartItems",JSON.stringify(c));
    window.dispatchEvent(new Event("cart_update"));
    alert("Added to cart");
  };

  const handleToggleWishlist = prod => {
    let w;
    if(wishlistItems.some(x=>x._id===prod._id)){
      w = wishlistItems.filter(x=>x._id!==prod._id);
    } else {
      w = [...wishlistItems,prod];
    }
    setWishlistItems(w);
    localStorage.setItem("wishlist",JSON.stringify(w));
    window.dispatchEvent(new Event("wishlist_update"));
  };

  const inWishlist = prod => wishlistItems.some(x=>x._id===prod._id);

  return (
    <>
      <Navbar />
      <div className="flex mt-16">
        <aside className="w-1/4 p-6">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          {Object.entries(filters).map(([k,opts])=>(
            <FilterSection
              key={k}
              title={k}
              options={opts}
              selected={filtersState[k]}
              onChange={toggleFilter}
            />
          ))}
        </aside>
        <main className="w-3/4 p-6">
          <SortBox
            selectedSort={sortBy}
            setSelectedSort={setSortBy}
            setLoading={setLoading}
          />
          <h2 className="text-2xl mb-4">{filtered.length} Results</h2>
          {loading
            ? <p>Loading...</p>
            : <div className="grid grid-cols-3 gap-6">
                {filtered.map(p=>(
                  <div key={p._id} className="border p-4 rounded">
                    <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-2"/>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="text-gray-500">{p.brand}</p>
                    <p className="font-bold mt-1">${p.price}</p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={()=>handleAddToCart(p)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart/> Add to Cart
                      </button>
                      <button
                        onClick={()=>handleToggleWishlist(p)}
                        className={`flex-1 py-2 rounded flex items-center justify-center gap-2 ${
                          inWishlist(p)?"bg-pink-500 text-white":"bg-red-500 text-white"
                        }`}
                      >
                        <FaHeart/> {inWishlist(p)?"Remove":"Wishlist"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
          }
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
