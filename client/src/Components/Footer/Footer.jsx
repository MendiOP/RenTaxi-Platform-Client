// components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  const imageUrls = [
    "https://i.ibb.co.com/Fbm1wrp/c9.jpg",
    "https://i.ibb.co.com/yV6hTtN/c8.jpg",
    "https://i.ibb.co.com/rdnYf4M/c7.jpg",
    "https://i.ibb.co.com/fttmcBM/c6.webp",
    "https://i.ibb.co.com/Km7PQ1V/c5.jpg",
    "https://i.ibb.co.com/9T76V6g/c4.jpg",
    "https://i.ibb.co.com/S3JfYYP/c3.jpg",
    "https://i.ibb.co.com/JWTD1S3/c2.webp",
    "https://i.ibb.co.com/s6rXxFM/c1.webp",
  ];

  return (
    <footer className="py-10 px-5 lg:px-20 bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Us Section */}
        <div>
          <h3 className="text-yellow-400 text-3xl font-bold mb-4">About us</h3>
          <h4 className="text-2xl font-bold flex items-center">
            <span className="mr-2">🚕</span> RenTaxi
          </h4>
          <p className="text-gray-400 mt-2">
            Discover the perfect ride for every journey with our premium vehicle
            rental service, offering unmatched convenience and affordability.
            Choose from a wide selection of well-maintained cars designed to
            suit your style and needs, all bookable through our seamless online
            platform. With reliable service and competitive rates, your travel
            experience is our top priority.
          </p>
          <button className="mt-4 px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500">
            <Link to="/">Learn More</Link>
          </button>
        </div>

        {/* Useful Links Section */}
        <div>
          <h3 className="text-yellow-400 text-3xl font-bold mb-4">
            Useful Links
          </h3>
          <ul className="space-y-2">
            {[
              "Home",
              "Get a cab",
              "Our car",
              "Contact page",
              "Reviews",
              "Booking",
            ].map((link) => (
              <li key={link} className="hover:text-yellow-400">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Hot Contact Section */}
        <div>
          <h3 className="text-yellow-400 text-3xl font-bold mb-4">
            Hot Contact
          </h3>
          <ul className="space-y-2">
            <li>📧 mehedihm2015@gmail.com</li>
            <li>📞 (+880) 1723976954</li>
            <li>📍 Vuter Goli, Green Road, Dhanmondi, Dhaka-1205</li>
          </ul>
          <h4 className="text-yellow-400 mt-6 text-2xl font-bold">Subscribe</h4>
          <p className="text-gray-400 mt-2">Subscribe to our Newsletters</p>
          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-grow p-2 rounded-l bg-gray-800 text-white border border-gray-600"
            />
            <button className="px-4 bg-yellow-400 text-black rounded-r hover:bg-yellow-500">
              ➤
            </button>
          </div>
        </div>

        {/* Photo Gallery Section */}
        <div>
          <h3 className="text-yellow-400 text-3xl font-bold mb-4">
            Photo Gallery
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((url, i) => (
              <div
                key={i}
                className="w-full h-20 bg-gray-700 rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt={`Car ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 border-t border-gray-700 pt-4">
        <p>Copyright © 2017 SoftHopper - All Rights Reserved</p>
        <div className="flex justify-center space-x-4 mt-2">
          <SocialIcon url="https://facebook.com" />
          <SocialIcon url="https://twitter.com" />
          <SocialIcon url="https://instagram.com" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
