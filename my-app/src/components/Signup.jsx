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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
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
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center pl-16">
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
          <h2 className="text-center font-semibold text-md">Sign Up</h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
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
            <div className="flex items-center border rounded px-3 py-2">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/phone.png"
                alt="phone"
                className="mr-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Enter Mobile Number"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/lock.png"
                alt="password"
                className="mr-2"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/lock--v1.png"
                alt="confirm password"
                className="mr-2"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full outline-none"
                onChange={handleChange}
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-full font-semibold"
            >
              Sign Up
            </button>
            <div className="text-center text-sm">Or</div>
            <div className="flex justify-between gap-2">
              <button
                onClick={() =>
                  window.open("http://localhost:5000/api/auth/google", "_self")
                }
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
                onClick={() =>
                  window.open(
                    "http://localhost:5000/api/auth/facebook",
                    "_self"
                  )
                }
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
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
