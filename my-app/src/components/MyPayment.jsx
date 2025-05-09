import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import Navbar from '../components/HomeComponents/Navbar';
import Footer from '../components/HomeComponents/Footer';

export default function PaymentMethodPage() {
    const navigate = useNavigate();
    const [orderTotal, setOrderTotal] = useState(0);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [showDetails, setShowDetails] = useState({});

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const total = storedCart.reduce((sum, item) => sum + item.price - (item.price * (item.discount || 0) / 100), 0);
        setOrderTotal(total);
    }, []);

    const toggleDetails = (method) => {
        setShowDetails((prev) => ({
            ...prev,
            [method]: !prev[method]
        }));
    };

    const handlePlaceOrder = () => {
        if (selectedMethod) {
            navigate('/order-summary');
        } else {
            alert('Please select a payment method');
        }
    };

    const paymentMethods = [
        { key: 'cod', label: 'Cash on Delivery', details: 'Pay cash when your order is delivered' },
        { key: 'online', label: 'Pay Online', details: 'Pay with UPI, Net Banking, or Credit/Debit Cards' },
        { key: 'upi', label: 'Pay by any UPI App', details: 'Link your UPI account for fast payments' },
        { key: 'wallet', label: 'Wallet', details: 'Pay using your preferred wallet like Paytm or PhonePe' },
        { key: 'card', label: 'Debit/Credit Cards', details: 'Pay with your Visa, MasterCard, or RuPay card' }
    ];

    return (
        <>
            <Navbar />
            <div className="px-4 py-6 bg-gray-100 min-h-screen">
                <button onClick={() => navigate(-1)} className="text-gray-600 mb-4">
                    <FaChevronLeft className="inline mr-2" /> Back
                </button>
                <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
                <div className="bg-white p-4 rounded mb-4 shadow-sm">
                    <h3 className="font-semibold mb-3">Select Payment Method</h3>

                    {/* Payment Options */}
                    {paymentMethods.map((method) => (
                        <div key={method.key} className="border-b py-2">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method.key}
                                    checked={selectedMethod === method.key}
                                    onChange={() => setSelectedMethod(method.key)}
                                    className="mr-2"
                                />
                                {method.label}
                            </label>
                            <div
                                className={`text-sm mt-2 pl-6 ${showDetails[method.key] ? "" : "hidden"}`}
                                onClick={() => toggleDetails(method.key)}
                            >
                                {method.details}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow p-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">₹{orderTotal.toFixed(2)}</span>
                    <button onClick={handlePlaceOrder} className="bg-purple-600 text-white py-2 px-6 rounded-md">Place Order</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
