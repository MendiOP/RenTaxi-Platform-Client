import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import demouser from "../../assets/demouser.png";
import taxi from "../../assets/taxi.jpg";
import { AuthContext } from "../../AuthContext/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOutUser } = useContext(AuthContext);

  const getNavLinkClasses = ({ isActive }) =>
    isActive
      ? "text-[#20515d] font-bold border-b-2 border-[#2f7585]"
      : "text-[#292929] hover:text-[#2f7585]";

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <header className="bg-white py-5 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left: Brand Logo and Name */}
        <div className="flex items-center">
          <img src={taxi} alt="Taxi Cab Logo" className="h-12 w-12 mr-2" />
          <h1 className="text-3xl font-extrabold text-[#20515d]">RenTaxi</h1>
        </div>

        {/* Center: Horizontal Menu (shown on large screens) */}
        <nav className="hidden lg:flex space-x-8 items-center font-semibold text-base">
          <NavLink to="/" className={getNavLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/availablecars" className={getNavLinkClasses}>
            Available Cars
          </NavLink>
          {user && (
            <>
              <NavLink to="/addcar" className={getNavLinkClasses}>
                Add Car
              </NavLink>
              <NavLink to="/mycar" className={getNavLinkClasses}>
                My Car
              </NavLink>
              <NavLink to="/mybookings" className={getNavLinkClasses}>
                My Bookings
              </NavLink>
            </>
          )}
        </nav>

        {/* Right: User Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {!user ? (
            <>
              <NavLink to="/login" className={getNavLinkClasses}>
                Login
              </NavLink>
              <NavLink to="/register" className={getNavLinkClasses}>
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <img
                src={user?.photoURL || demouser}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-[#2f7585] object-cover"
              />
              <button
                onClick={handleSignOut}
                className="text-[#20515d] hover:text-[#2f7585] font-semibold"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex items-center text-[#292929] focus:outline-none"
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

      {/* Mobile vertical menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white shadow-lg">
          <ul className="space-y-2 px-4 py-2 font-semibold">
            <li>
              <NavLink to="/" className={getNavLinkClasses}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/availablecars" className={getNavLinkClasses}>
                Available Cars
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/addcar" className={getNavLinkClasses}>
                    Add Car
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mycar" className={getNavLinkClasses}>
                    My Car
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/mybookings" className={getNavLinkClasses}>
                    My Bookings
                  </NavLink>
                </li>
              </>
            )}
            {!user ? (
              <>
                <li>
                  <NavLink to="/login" className={getNavLinkClasses}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={getNavLinkClasses}>
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-[#20515d] hover:text-[#2f7585]"
                >
                  <img
                    src={user?.photoURL || demouser}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-[#2f7585] object-cover"
                  />
                  <span className="font-semibold">Log Out</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
