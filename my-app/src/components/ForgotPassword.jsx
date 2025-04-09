import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset link sent. Please check your email.");
      } else {
        setMessage(data.message || "Failed to send password reset link.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-center text-2xl font-bold">Forgot Password</h2>
        {message && <p className="text-center text-sm text-red-500">{message}</p>}
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-full font-semibold"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
