import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import taxi from "../../assets/taxi.jpg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white py-5 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <img src={taxi} alt="Taxi Cab Logo" className="h-12 w-12 mr-2" />
          <h1 className="text-3xl font-extrabold text-red-600">RenTaxi</h1>
        </div>

        {/* horizontal Menu */}
        <nav className="hidden lg:flex space-x-8 items-center font-bold text-lg text-black">
          <NavLink to="/" className="hover:text-red-600">
            Home
          </NavLink>
          <NavLink to="/availablecars" className="hover:text-red-600">
            Available Cars
          </NavLink>

          <NavLink to="/addcar" className="hover:text-red-600">
            Add Car
          </NavLink>
          <NavLink to="/mycar" className="hover:text-red-600">
            My Car
          </NavLink>

          <NavLink to="/mybookings" className="hover:text-red-600">
            My Bookings
          </NavLink>

          <NavLink to="/login" className="hover:text-red-600">
            Login
          </NavLink>

          <NavLink to="/register" className="hover:text-red-600">
            Sign Up
          </NavLink>

          <NavLink to="/logout" className="hover:text-red-600">
            Log Out
          </NavLink>
        </nav>

        {/* vertical Menu Button */}
        <button
          className="lg:hidden flex items-center text-black focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* vertical Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white shadow-lg">
          <ul className="space-y-2 px-4 py-2 font-semibold text-black">
            <li>
              <NavLink to="/" className="block hover:text-red-600">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/availablecars" className="hover:text-red-600">
                Available Cars
              </NavLink>
            </li>
            <li>
              <NavLink to="/addcar" className="hover:text-red-600">
                Add Car
              </NavLink>
            </li>
            <li>
              <NavLink to="/mycar" className="hover:text-red-600">
                My Car
              </NavLink>
            </li>
            <li>
              <NavLink to="/mybookings" className="hover:text-red-600">
                My Bookings
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="hover:text-red-600">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="hover:text-red-600">
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout" className="hover:text-red-600">
                Log Out
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
