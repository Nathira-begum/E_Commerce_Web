import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(null); // null means "loading"

  // ✅ Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/validate-reset-token/${token}`);
        const data = await res.json();

        if (res.ok) {
          setTokenValid(true);
        } else {
          setMessage(data.message || "Invalid or expired token.");
          setMessageType("error");
          setTokenValid(false);
        }
      } catch (err) {
        setMessage("Server error while validating token.");
        setMessageType("error");
        setTokenValid(false);
      }
    };

    validateToken();
  }, [token]);

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side checks
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      let data = {};
      try {
        data = await res.json(); // May fail if backend returns non-JSON
      } catch (jsonError) {
        console.error("Invalid JSON response from server:", jsonError);
      }

      if (res.ok) {
        setMessage("Password reset successful!");
        setMessageType("success");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Failed to reset password.");
        setMessageType("error");
      }
    } catch (err) {
      console.error("Network error:", err);
      setMessage("Network error. Please try again later.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Reset Password</h2>

        {message && (
          <p className={`text-center text-sm mb-3 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
            {message}
          </p>
        )}

        {tokenValid === null ? (
          <p className="text-center text-sm text-gray-500">Validating token...</p>
        ) : tokenValid ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-2 rounded-full font-semibold"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <div className="mt-4 space-y-2">
            <p className="text-center text-red-600">This token is invalid or expired.</p>
            <button
              className="w-full bg-gray-500 hover:bg-gray-600 transition text-white py-2 rounded-full font-semibold"
              onClick={() => navigate("/forgot-password")}
            >
              Request New Token
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
