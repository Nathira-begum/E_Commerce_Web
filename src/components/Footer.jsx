import React from 'react';
import { FaInstagram, FaFacebookF, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1F3557] text-white px-6 md:px-20 pt-12 pb-6">
      {/* Logo Section */}
      <div className="flex justify-center mb-10">
        <h1 className="text-7xl font-bold text-center" style={{ fontFamily: 'Holtwood One SC, serif' }}>
          TRE<span className="text-red-600">N</span>DIFY
        </h1>
      </div>

      {/* Bottom Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
        {/* Discover */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Discover</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/order-track" className="hover:underline">Order Track</a></li>
            <li><a href="/collection" className="hover:underline">Collection</a></li>
            <li><a href="/new-arrivals" className="hover:underline">New Arrivals</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Social</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline"><FaInstagram className="inline mr-2" />Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline"><FaFacebookF className="inline mr-2" />Facebook</a></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Info</h2>
          <ul className="space-y-3 text-sm">
            <li><FaMapMarkerAlt className="inline text-red-500 mr-2" />13 HSR Layout Bangalore</li>
            <li><FaEnvelope className="inline text-red-500 mr-2" />support@trendify.com</li>
            <li><FaPhoneAlt className="inline text-red-500 mr-2" />+91 9876543210</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Elevate your style with our curated collection of trendy and timeless fashion pieces for every occasion.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Your Email address"
              className="bg-transparent border-b border-gray-400 placeholder-white outline-none text-white py-1 px-2 w-full"
            />
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-10 flex flex-col md:flex-row justify-between text-xs text-gray-400">
        <p>2025 Trendify. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#">Privacy policy</a>
          <a href="#">Terms of services</a>
          <a href="#">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
