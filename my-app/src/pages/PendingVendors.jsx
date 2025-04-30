import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminComponents/AdminSidebar";

const PendingVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      const res = await fetch("http://localhost:5000/api/admin/vendors/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await res.json();
      setVendors(data);
      setLoading(false);
    };

    fetchVendors();
  }, []);

  const handleApprove = async (vendorId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/vendors/approve/${vendorId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      if (res.ok) {
        setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
      } else {
        alert("Failed to approve vendor.");
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
        <h2 className="text-xl font-semibold mb-4">Pending Vendors</h2>
        <div>
          {vendors.length === 0 ? (
            <p>No vendors pending approval.</p>
          ) : (
            vendors.map((vendor) => (
              <div key={vendor._id} className="border p-4 mb-4">
                <h3 className="text-lg font-semibold">{vendor.shopName}</h3>
                <p>{vendor.name}</p>
                <button
                  onClick={() => handleApprove(vendor._id)}
                  className="bg-green-500 text-white px-4 py-2 mt-2"
                >
                  Approve Vendor
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingVendors;
