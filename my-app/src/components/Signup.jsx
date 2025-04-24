import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      return setError("Please enter a valid email address");
    }

    if (!formData.name.trim()) {
      return setError("Name is required");
    }

    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      return setError("Please enter a valid 10-digit phone number");
    }

    if (!formData.password || formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      <div className="w-1/2 bg-red-700 text-white flex flex-col justify-center pl-16">
        <div className="z-20">
          <h1 className="text-4xl font-bold mb-4">
            HELLO, <br />
            WELCOME
          </h1>
          <p className="text-sm">
            Unlock exclusive styles. <br />
            Join the Tandify tribe
          </p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm space-y-4">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex items-center border rounded px-3 py-2">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/new-post.png"
                alt="email"
                className="mr-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* Name */}
            <div className="flex items-center border rounded px-3 py-2">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/user.png"
                alt="name"
                className="mr-2"
              />
              <input
                type="text"
                name="name"
                placeholder="Enter Name"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="flex items-center border rounded px-3 py-2">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/phone.png"
                alt="phone"
                className="mr-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter Phone Number"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center border rounded px-3 py-2 relative">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/lock.png"
                alt="password"
                className="mr-2"
              />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3"
              >
                <img
                  src={
                    passwordVisible
                      ? "https://img.icons8.com/ios-filled/20/000000/visible.png"
                      : "https://img.icons8.com/ios-filled/20/000000/invisible.png"
                  }
                  alt={passwordVisible ? "Hide password" : "Show password"}
                />
              </button>
            </div>

            {/* Confirm Password */}
            <div className="flex items-center border rounded px-3 py-2 relative">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/lock--v1.png"
                alt="confirm password"
                className="mr-2"
              />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3"
              >
                <img
                  src={
                    confirmPasswordVisible
                      ? "https://img.icons8.com/ios-filled/20/000000/visible.png"
                      : "https://img.icons8.com/ios-filled/20/000000/invisible.png"
                  }
                  alt={
                    confirmPasswordVisible ? "Hide password" : "Show password"
                  }
                />
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800 transition"
            >
              Sign Up
            </button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
