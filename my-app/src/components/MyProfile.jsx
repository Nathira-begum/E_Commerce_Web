import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./HomeComponents/Navbar";
import { BiCategory } from "react-icons/bi";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import {
  FaThLarge,
  FaBox,
  FaMoneyCheckAlt,
  FaWallet,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "",
    lname: "",
    email: "",
    phone: "",
  });

  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [cartItems, setCartItems] = useState([]); // Dummy placeholder

  useEffect(() => {
    const userDataString =
      localStorage.getItem("user") || sessionStorage.getItem("user");

    try {
      if (userDataString && userDataString !== "undefined") {
        const storedUser = JSON.parse(userDataString);

        setUser({
          name: storedUser.firstName || "",
          lname: storedUser.lastName || "",
          email: storedUser.email || "",
          phone: storedUser.phone || "",
        });

        setDob(storedUser.dob ? new Date(storedUser.dob) : null);
        setGender(storedUser.gender || "");
      }
    } catch (error) {
      console.error("Invalid user data in storage:", error);
    }
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        ...user,
        dob: dob ? dob.toISOString() : null,
        gender: gender, // <-- add this explicitly
      };

      console.log(updatedUser, "updateduser<<<<<<<<");
      const storedUserString = localStorage.getItem("user");

      // If no user is found in localStorage, show an error and exit
      if (!storedUserString) {
        throw new Error("User data not found in localStorage");
      }

      const storedUser = JSON.parse(storedUserString);

      // Check if userId exists in the storedUser
      if (!storedUser || !storedUser._id) {
        throw new Error("User ID not found in user data.");
      }

      // Get the userId from the stored user data
      const userId = storedUser._id;
      console.log(userId, "userid<<<<<<<<");
      try {
        const response = await fetch(
          "http://localhost:5000/api/update-profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              firstName: updatedUser.name,
              lastName: updatedUser.lname,
              email: updatedUser.email,
              phone: updatedUser.phone,
              gender: updatedUser.gender,
              dob: updatedUser.dob,
            }),
          }
        );

        let result = {};
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
        } else {
          const text = await response.text();
          console.warn("⚠️ Not JSON response:", text);
          throw new Error("Server returned non-JSON response");
        }

        if (!response.ok) {
          if (result && result.message === "User not found") {
            localStorage.removeItem("user");
            alert("User not found. Please login again.");
          } else {
            alert(result?.message || "Something went wrong.");
          }
          return;
        }

        // ✅ If everything went well
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: storedUser._id,
            firstName: updatedUser.name,
            lastName: updatedUser.lname,
            phone: updatedUser.phone,
            gender: updatedUser.gender,
            dob: updatedUser.dob,
            email: updatedUser.email,
          })
        );

        alert("Profile updated successfully!");
      } catch (error) {
        console.error("❌ Error updating profile:", error);
        alert("Error updating profile<<<<<<<<<<<<<<");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar/>
      {/* Main Section */}
      <div className="flex px-10 py-8 gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-3 font-medium text-gray-700">
            <li>
              <NavLink
                to="/myaccount"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b ${
                    isActive
                      ? "text-black-500 border-black-500 hover:text-blue-500"
                      : "border-gray-200"
                  }`
                }
              >
                <FaThLarge className="text-lg" />
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myorders"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-blue-500"
                  }`
                }
              >
                <FaBox className="text-lg" />
                My Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mypayment"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-blue-500"
                  }`
                }
              >
                <FaMoneyCheckAlt className="text-lg" />
                My Payments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mywallet"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-blue-500"
                  }`
                }
              >
                <FaWallet className="text-lg" />
                My Wallet
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myaddress"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200 hover:text-blue-500"
                  }`
                }
              >
                <FaMapMarkerAlt className="text-lg" />
                My Addresses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myprofile"
                className={({ isActive }) =>
                  `flex items-center gap-3 py-2 border-b transition-colors duration-200 hover:text-blue-500 ${
                    isActive
                      ? "text-black border-black"
                      : "text-gray-700 border-gray-200"
                  }`
                }
              >
                <FaUser className="text-lg" />
                My Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Profile Form */}
        <div className="w-full md:w-3/4 bg-white shadow rounded-md p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">First Name *</label>
              <input
                type="text"
                name="name"
                value={user.name}
                // readOnly
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Last Name *</label>
              <input
                type="text"
                name="lname"
                value={user.lname || ""}
                // readOnly
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Email Id *</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Phone Number *</label>
              <div className="flex items-center border border-gray-300 rounded">
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  readOnly={!isEditable}
                  className={`w-full px-3 py-2 outline-none ${
                    isEditable ? "bg-white" : "bg-gray-100"
                  }`}
                />
                <button
                  className="text-blue-600 font-semibold px-4"
                  onClick={() => setIsEditable(true)}
                >
                  CHANGE
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-sm font-medium mb-1">DOB</label>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                dateFormat="dd-MM-yyyy"
                customInput={
                  <input
                    type="text"
                    value={dob ? dob.toLocaleDateString("en-GB") : ""}
                    placeholder="dd-mm-yyyy"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                }
              />
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Share your DOB to get special gifts on the 1st day of your birthday
            month
          </p>

          <div className="mt-4">
            <label className="text-sm font-medium">Gender</label>
            <div className="flex gap-4 mt-2">
              {["Male", "Female", "Other"].map((option) => (
                <button
                  key={option}
                  className={`flex-1 px-4 py-2 border rounded ${
                    gender === option
                      ? "bg-blue-300 text-black"
                      : "bg-white border-gray-300"
                  }`}
                  onClick={() => setGender(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="mt-6 bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-700"
              onClick={handleSave}
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 mt-2 text-white py-10 px-10">
        <h2 className="text-8xl font-extrabold mb-4 text-center font-stylish">
          TRE<span className="text-blue-600">N</span>DIFY
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Company</h4>
            <ul>
              <li>About Us</li>
              <li>Contact</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Help</h4>
            <ul>
              <li>FAQs</li>
              <li>Returns</li>
              <li>Shipping</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Follow Us</h4>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-extrabold mb-2">Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded w-full text-black"
            />
            <button className="bg-blue-600 w-full mt-2 p-2 rounded font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyProfile;
