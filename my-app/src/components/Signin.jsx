import React from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="flex h-screen w-screen font-sans">
      {/* Left Blue Panel */}
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center pl-16 relative overflow-hidden">
        {/* <div className="absolute top-0 right-[-80px] w-[200px] h-full bg-white rotate-[45deg] z-10"></div> */}
        <div className="z-20">
          <h1 className="text-4xl font-bold mb-4">HELLO, <br />WELCOME</h1>
          <p className="text-sm">
            Unlock exclusive styles. <br />Join the Tandify tribe
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm space-y-4">
          <h2 className="text-center font-semibold text-md">Signin</h2>

          <form className="space-y-3">
            <div className="flex items-center border rounded px-3 py-2">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/new-post.png"
                alt="email"
                className="mr-2"
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full outline-none"
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
                placeholder="Enter Name"
                className="w-full outline-none"
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
                placeholder="Enter Mobile Number"
                className="w-full outline-none"
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
                placeholder="enter password"
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center border rounded px-3 py-2">
              <img
                src="https://img.icons8.com/ios-filled/20/000000/lock--v1.png"
                alt="confirm"
                className="mr-2"
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded-full font-semibold"
            >
              Sign In
            </button>

            <div className="text-center text-sm">Or</div>

            <div className="flex justify-between gap-2">
              <button className="border rounded-full px-3 py-1 flex items-center w-1/2 justify-center">
                <img
                  src="https://img.icons8.com/color/16/000000/google-logo.png"
                  alt="Google"
                  className="mr-1"
                />
                Google
              </button>
              <button className="border rounded-full px-3 py-1 flex items-center w-1/2 justify-center">
                <img
                  src="https://img.icons8.com/fluency/16/facebook-new.png"
                  alt="Facebook"
                  className="mr-1"
                />
                Facebook
              </button>
            </div>
            <p className="text-center text-sm">
              Already have an account ?{" "}
              <Link to="/" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
