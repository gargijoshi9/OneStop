import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // mobile menu toggle
  const [profileOpen, setProfileOpen] = useState(false); // profile dropdown toggle
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/login"); // redirect to login after logout
  };

  const toggleMobileMenu = () => setIsOpen((prev) => !prev);

  const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CareerPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              to="/aptitude-test"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Aptitude Test
            </Link>
            <Link
              to="/course-explorer"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Course Explorer
            </Link>
            <Link
              to="/college-directory"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Colleges
            </Link>
            <Link
              to="/timeline"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Timeline
            </Link>

            {/* User Profile Dropdown */}
            {user ? (
              <div className="relative ml-6" ref={profileRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 border-2 border-green-400 text-indigo-700 font-bold">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </span>
                  <span className="text-gray-900 font-medium">{user.name}</span>
                  <svg
                    className="ml-1 h-4 w-4 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.002-1.06z" />
                  </svg>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-30">
                    <Link
                      to="/my-courses"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      <span className="mr-2">🗂️</span> My Courses
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      <span className="mr-2">👤</span> Profile
                    </Link>
                    <button
                      className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 text-left"
                      onClick={handleLogout}
                    >
                      <span className="mr-2">🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-blue-600 bg-white border border-blue-600 hover:bg-blue-50"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-expanded={isOpen}
            >
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white pb-3 px-2 pt-2">
          <div className="flex flex-col space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/aptitude-test"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Aptitude Test
            </Link>
            <Link
              to="/course-explorer"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Course Explorer
            </Link>
            <Link
              to="/college-directory"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Colleges
            </Link>
            <Link
              to="/timeline"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Timeline
            </Link>
            {user ? (
              <>
                <span className="block px-3 py-2 font-medium text-gray-900">
                  Hi, {user.name}
                </span>
                <Link
                  to="/my-courses"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  My Courses
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 rounded-md text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full mt-1 px-3 py-2 rounded-md text-center text-blue-600 border border-blue-600 bg-white hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
