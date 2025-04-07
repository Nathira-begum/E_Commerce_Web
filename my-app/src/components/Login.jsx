import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex h-screen font-sans">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-sm">
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
              className="w-full bg-[#3d5cb8] text-white py-2 rounded-full font-semibold"
            >
              Login
            </button>
            <div className="text-center text-sm">Or</div>
            <div className="flex justify-between gap-2">
              <button className="border rounded-full px-3 py-1 flex items-center w-full justify-center">
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="Google"
                  className="mr-2"
                />
                Google
              </button>
              <button className="border rounded-full px-3 py-1 flex items-center w-full justify-center">
                <img
                  src="https://img.icons8.com/fluency/16/facebook-new.png"
                  alt="Facebook"
                  className="mr-2"
                />
                Facebook
              </button>
            </div>
            <p className="text-center text-sm">
              Already have an account ? {" "}
              <Link to="/signup" className="text-[#3d5cb8]">
                Signin
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-[#3d5cb8] text-white flex justify-center items-center relative overflow-hidden">
        <div className="absolute left-[-50px] top-0 bottom-0 w-[100px] bg-white rotate-[45deg] z-10"></div>
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
