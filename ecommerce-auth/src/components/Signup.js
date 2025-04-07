// src/components/Signup.js
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-3">HELLO, WELCOME</h1>
        <p>Unlock exclusive styles. Join the Tandify tribe</p>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <h2 className="text-xl font-bold mb-4">SignUp</h2>
        <div className="grid grid-cols-2 gap-3 w-full">
          <input className="border p-2 rounded" placeholder="Enter Email" />
          <input className="border p-2 rounded" placeholder="Enter Name" />
          <input className="border p-2 rounded" placeholder="Enter Mobile Number" />
          <input className="border p-2 rounded" placeholder="Enter Password" />
          <input className="border p-2 rounded" placeholder="Confirm Password" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign up</button>
        </div>

        <div className="flex justify-between gap-4 my-5">
          <button className="flex items-center border px-3 py-1 rounded">
            <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google" className="mr-2" />
            Google
          </button>
          <button className="flex items-center border px-3 py-1 rounded">
            <img src="https://img.icons8.com/color/16/000000/facebook-new.png" alt="facebook" className="mr-2" />
            Facebook
          </button>
        </div>

        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
