import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
        credentials: "include", // Ensure credentials are sent (if needed)
      });

      // Log the response for debugging
      const data = await res.json();
      console.log("Response Status:", res.status);
      console.log("Response Data:", data);

      if (res.ok) {
        // Successful login
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/"); // Redirect to homepage or dashboard
      } else {
        // Handle failed login attempt
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth login endpoint
    window.open("http://localhost:5000/api/auth/google?prompt=select_account", "_self");
  };

  const handleFacebookLogin = () => {
    // Redirect to Facebook OAuth login endpoint
    window.open("http://localhost:5000/api/auth/facebook", "_self");
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      <div className="w-1/2 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-sm">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/user.png"
                alt="user icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type="text"
                placeholder="Enter username/email"
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <img
                src="https://img.icons8.com/ios-glyphs/20/000000/lock--v1.png"
                alt="password icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <img
                  src={
                    isPasswordVisible
                      ? "https://img.icons8.com/ios-glyphs/20/000000/visible.png"
                      : "https://img.icons8.com/ios-glyphs/20/000000/invisible.png"
                  }
                  alt={isPasswordVisible ? "Hide password" : "Show password"}
                />
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <p className="text-sm text-center">
              <Link to="/forgot-password" className="text-red-600 hover:underline">
                Forgot Password?
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded-full font-semibold"
            >
              Login
            </button>
            <div className="text-center text-sm">Or</div>
            <div className="flex justify-between gap-2">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="border rounded-full px-3 py-1 flex items-center w-1/2 justify-center"
              >
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="Google"
                  className="mr-1"
                />
                Google
              </button>
              <button
                onClick={handleFacebookLogin}
                type="button"
                className="border rounded-full px-3 py-1 flex items-center w-1/2 justify-center"
              >
                <img
                  src="https://img.icons8.com/fluency/16/facebook-new.png"
                  alt="Facebook"
                  className="mr-1"
                />
                Facebook
              </button>
            </div>
            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-red-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-red-700 text-white flex flex-col justify-center items-center">
        <div className="z-20 text-center">
          <h1 className="text-4xl font-bold">
            WELCOME
            <br />
            BACK !
          </h1>
          <p className="text-sm mt-4">Your fashion journey starts here</p>
        </div>
      </div>
    </div>
  );
}
