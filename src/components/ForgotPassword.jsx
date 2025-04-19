import React, { useState, useEffect } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        // Successfully sent password reset link
        setMessage("Password reset link sent. Please check your email.");
        setMessageType("success");
        setEmail(""); // Clear email field after successful submission
      } else {
        // Handle failure based on response from the backend
        setMessage(data.message || "Failed to send password reset link.");
        setMessageType("error");
        
      }
    } catch (err) {
      // Handle any network or unexpected errors
      setMessage("Something went wrong. Please try again later.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Forgot Password</h2>

        {/* Displaying success or error message */}
        {message && (
          <p
            className={`text-center text-sm mb-3 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        )}

        {/* Form for entering the email address */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-2 rounded-full font-semibold"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
