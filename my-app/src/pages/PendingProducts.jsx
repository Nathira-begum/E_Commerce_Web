import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";

const PendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/admin/products/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleApprove = async (productId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/products/approve/${productId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        alert("Failed to approve product.");
      }
    } catch (error) {
      console.error("Approve error:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow p-6">
        <h2 className="text-xl font-semibold mb-4">Pending Products</h2>
        <div>
          {products.length === 0 ? (
            <p>No products pending approval.</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className="border p-4 mb-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <img src={product.image} alt={product.name} className="h-24 mt-2" />
                <button
                  onClick={() => handleApprove(product._id)}
                  className="bg-green-500 text-white px-4 py-2 mt-2"
                >
                  Approve Product
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingProducts;

