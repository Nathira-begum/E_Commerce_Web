import React, { useState, useEffect } from "react";
import Navbar from "../components/HomeComponents/Navbar";
import Footer from "../components/HomeComponents/Footer";

export default function MyAddress() {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("profile")) || {};
        setUser(storedUser);
        setUpdatedUser({
            name: storedUser.name || "",
            email: storedUser.email || "",
            phone: storedUser.phone || "",
            address: storedUser.address || ""
        });
    }, []);

    const handleSave = () => {
        localStorage.setItem("profile", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
    };

    return (
        <>
            <Navbar />
            <div className="px-4 py-6 bg-gray-100 min-h-screen">
                <h2 className="text-lg font-semibold mb-6">My Address</h2>

                {!isEditing ? (
                    <div className="bg-white p-4 rounded shadow-sm mb-4">
                        <p className="text-gray-700 font-semibold mb-2">Name: {user.name || "Your Name"}</p>
                        <p className="text-gray-700 mb-2">Email: {user.email || "your-email@example.com"}</p>
                        <p className="text-gray-700 mb-2">Phone: {user.phone || "Your Phone Number"}</p>
                        <p className="text-gray-700 mb-2">Address: {user.address || "Your Address"}</p>
                        <button 
                            onClick={() => setIsEditing(true)} 
                            className="bg-blue-600 text-white py-2 px-4 rounded"
                        >
                            Edit Address
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded shadow-sm mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={updatedUser.name}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={updatedUser.email}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={updatedUser.phone}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })}
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <textarea
                            placeholder="Address"
                            value={updatedUser.address}
                            onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })}
                            className="w-full mb-3 p-2 border rounded"
                            rows="3"
                        />
                        <div className="flex justify-end">
                            <button 
                                onClick={handleSave} 
                                className="bg-blue-600 text-white py-2 px-4 rounded mr-2"
                            >
                                Save
                            </button>
                            <button 
                                onClick={() => setIsEditing(false)} 
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
