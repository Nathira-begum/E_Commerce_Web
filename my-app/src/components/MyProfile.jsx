import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
import Navbar from "../components/HomeComponents/Navbar";
import Footer from "../components/HomeComponents/Footer";

const MyProfile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  // Load user/profile data from localStorage/sessionStorage
  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user")) || {};
    const storedProfile =
      JSON.parse(localStorage.getItem("profile") || sessionStorage.getItem("profile")) || {};

    const mergedData = {
      firstName: storedUser.firstName || storedProfile.firstName || "",
      lastName: storedUser.lastName || storedProfile.lastName || "",
      email: storedUser.email || storedProfile.email || "",
      phone: storedUser.phone || storedProfile.phone || "",
      dob: storedUser.dob || storedProfile.dob || null,
      gender: storedUser.gender || storedProfile.gender || "",
      _id: storedUser._id || null,
    };

    setUser({
      firstName: mergedData.firstName,
      lastName: mergedData.lastName,
      email: mergedData.email,
      phone: mergedData.phone,
      _id: mergedData._id,
    });

    setDob(mergedData.dob ? new Date(mergedData.dob) : null);
    setGender(mergedData.gender || "");
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
        gender,
      };

      const storedUserString = localStorage.getItem("user") || sessionStorage.getItem("user");

      if (!storedUserString) {
        alert("User not logged in.");
        return;
      }

      const storedUser = JSON.parse(storedUserString);

      if (!storedUser._id) {
        alert("User ID not found. Are you logged in via Google?");
        return;
      }

      const userId = storedUser._id;

      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...updatedUser, userId }),
      });

      const contentType = response.headers.get("content-type");
      const result = contentType && contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        alert(result?.message || "Something went wrong.");
        return;
      }

      // Save to localStorage
      const updatedStorageUser = {
        ...storedUser,
        ...updatedUser,
      };
      localStorage.setItem("user", JSON.stringify(updatedStorageUser));
      localStorage.setItem("profile", JSON.stringify(updatedStorageUser));

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex px-10 py-8 gap-6 mt-12">
        {/* Sidebar */}
        <div className="w-1/4 bg-white shadow-md rounded-lg p-6">
          <ul className="space-y-3 font-medium text-gray-700">
            {[
              { to: "/myaccount", icon: <FaThLarge />, label: "Overview" },
              { to: "/myorders", icon: <FaBox />, label: "My Orders" },
              { to: "/mypayment", icon: <FaMoneyCheckAlt />, label: "My Payments" },
              { to: "/mywallet", icon: <FaWallet />, label: "My Wallet" },
              { to: "/myaddress", icon: <FaMapMarkerAlt />, label: "My Addresses" },
              { to: "/myprofile", icon: <FaUser />, label: "My Profile" },
            ].map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 py-2 border-b transition-colors duration-200 ${
                      isActive
                        ? "text-black border-black"
                        : "text-gray-700 border-gray-200 hover:text-red-500"
                    }`
                  }
                >
                  {icon}
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Form */}
        <div className="w-full md:w-3/4 bg-white shadow rounded-md p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
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
              <label className="text-sm font-medium">Phone</label>
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
                  className="text-red-600 font-semibold px-4"
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
            Share your DOB to get special gifts on the 1st day of your birthday month
          </p>

          <div className="mt-4">
            <label className="text-sm font-medium">Gender</label>
            <div className="flex gap-4 mt-2">
              {["Male", "Female", "Other"].map((option) => (
                <button
                  key={option}
                  className={`flex-1 px-4 py-2 border rounded ${
                    gender === option
                      ? "bg-red-500 text-black"
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
              className="mt-6 bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600"
              onClick={handleSave}
            >
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyProfile;
