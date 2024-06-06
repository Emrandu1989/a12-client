import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider";
import Logo from "../../assets/Logo-1.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logOut();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 py-4 z-50 relative"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link
            to="/"
            className="flex items-center text-white text-lg font-semibold mr-6 transition duration-500 ease-in-out transform hover:scale-110"
          >
            <img
              src={Logo}
              alt="Logo"
              className="rounded-full w-[200px] mx-2"
            />
          </Link>
        </div>
        <div className="hidden md:flex justify-center">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-white hover:bg-gray-700 capitalize"
          >
            dashboard
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-white hover:bg-gray-700 capitalize"
          >
            Contact
          </Link>
          {user ? (
            <div></div>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-white hover:bg-gray-700 capitalize"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-white hover:bg-gray-700 capitalize"
              >
                Signup
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center relative z-50">
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="mx-2 focus:outline-none transition duration-500 ease-in-out transform hover:scale-110"
            >
              <div>
                {user ? (
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <></>
                )}
              </div>
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                {user ? (
                  <div>
                    <p className="block px-4 py-2 text-gray-800">
                      {user?.displayName}
                    </p>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={
          isMobileMenuOpen
            ? { opacity: 1, height: "auto" }
            : { opacity: 0, height: 0 }
        }
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden"
      >
        <div className="bg-gray-800">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-white hover:bg-gray-700 capitalize"
          >
            dashboard
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 text-white hover:bg-gray-700 capitalize"
          >
            Contact
          </Link>
          {user ? (
            <div></div>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 text-white hover:bg-gray-700 capitalize"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 text-white hover:bg-gray-700 capitalize"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
