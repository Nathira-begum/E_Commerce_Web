import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left section */}
      <div className="w-1/2 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <h2 className="text-center text-sm font-semibold mb-4">Login</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="enter username/email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <input
              type="password"
              placeholder="enter password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <p className="text-sm text-center">Forget Password ?</p>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-full font-semibold"
            >
              Login
            </button>
            <div className="text-center text-sm">Or</div>
            <div className="flex justify-between">
              <button className="border rounded-full px-3 py-1 flex items-center">
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" className="mr-1" />
                Google
              </button>
              <button className="border rounded-full px-3 py-1 flex items-center">
                <img src="https://img.icons8.com/fluency/16/facebook-new.png" alt="Facebook" className="mr-1" />
                Facebook
              </button>
            </div>
            <p className="text-center text-sm">
              Already have an account ? <Link to="/signup" className="text-blue-600">Signin</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right section */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center relative">
        <div className="absolute left-[-50px] top-0 bottom-0 w-[100px] bg-white rotate-[45deg] z-10"></div>
        <div className="z-20 text-center">
          <h1 className="text-4xl font-bold">WELCOME<br />BACK !</h1>
          <p className="text-sm mt-4">Your fashion journey starts here</p>
        </div>
      </div>
    </div>
  );
}
