import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaTruck } from "react-icons/fa";
import Navbar from "../components/HomeComponents/Navbar";
import Footer from "../components/HomeComponents/Footer";

export default function ReviewOrderPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        name: "",
        address: "",
        phone: ""
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("profile")) || {};
        const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        setUser(storedUser);
        setNewAddress({
            name: storedUser.name || "",
            address: storedUser.address || "",
            phone: storedUser.phone || ""
        });
        setCartItems(storedCart);
    }, []);

    const totalProductPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    const totalDiscount = cartItems.reduce(
        (sum, item) => sum + (item.discount ? (item.price * parseFloat(item.discount)) / 100 : 0),
        0
    );
    const additionalFees = 2;
    const orderTotal = totalProductPrice - totalDiscount + additionalFees;

    const handleAddressChange = () => {
        localStorage.setItem("profile", JSON.stringify(newAddress));
        setUser(newAddress);
        setIsAddressModalOpen(false);
    };

    return (
        <>
            <Navbar />
            <div className="px-4 py-6 bg-gray-100 min-h-screen">
                <button onClick={() => navigate(-1)} className="text-gray-600 mb-4">
                    <FaChevronLeft className="inline mr-2" /> Back
                </button>
                <h2 className="text-lg font-semibold mb-6">Review Your Order</h2>

                {/* Delivery Address */}
                <div className="bg-white p-4 rounded mb-4 shadow-sm">
                    <div className="flex items-center mb-2">
                        <FaTruck className="text-blue-600 mr-2" />
                        <span className="font-semibold text-gray-800">
                            Estimated Delivery by Monday, 19th May
                        </span>
                    </div>
                    <p className="text-gray-700 font-semibold">{user.name || "Your Name"}</p>
                    <p className="text-gray-600 text-sm">{user.address || "Your Address"}</p>
                    <p className="text-gray-600 text-sm mb-2">{user.phone || "Your Phone Number"}</p>
                    <button
                        onClick={() => setIsAddressModalOpen(true)}
                        className="text-blue-600 font-semibold"
                    >
                        Change
                    </button>
                </div>

                {/* Price Details */}
                <div className="bg-white p-4 rounded shadow-sm mb-4">
                    <h3 className="font-semibold mb-3">Price Details</h3>
                    <div className="flex justify-between text-gray-600">
                        <span>Total Product Price</span>
                        <span>+ ₹{totalProductPrice}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Total Discounts</span>
                        <span className="text-green-600">- ₹{totalDiscount}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Additional Fees</span>
                        <span>+ ₹{additionalFees}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                        <span>Order Total</span>
                        <span>₹{orderTotal}</span>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">₹{orderTotal}</span>
                    <button
                        onClick={() => navigate("/mypayment")}
                        className="bg-purple-600 text-white py-2 px-6 rounded-md"
                    >
                        Continue
                    </button>
                </div>
            </div>

            {/* Address Modal */}
            {isAddressModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Update Address</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            className="w-full mb-3 p-2 border rounded"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleAddressChange}
                                className="bg-blue-600 text-white py-2 px-4 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsAddressModalOpen(false)}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}
