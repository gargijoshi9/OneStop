import { FolderOpenIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

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
    navigate("/login");
  };

  const toggleMobileMenu = () => setIsOpen((prev) => !prev);

  const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

  return (
    <nav className="bg-black text-white shadow-md dark:shadow-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              sAarthI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {[
              { to: "/", label: "Home" },
              { to: "/aptitude-test", label: "Aptitude Test" },
              { to: "/course-explorer", label: "Course Explorer" },
              { to: "/college-directory", label: "Colleges" },
              { to: "/timeline", label: "Timeline" },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="text-white hover:text-indigo-400 transition duration-200 font-medium"
              >
                {label}
              </Link>
            ))}

            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="text-white font-medium">{user.name}</span>
                  <svg
                    className={`w-5 h-5 text-white transition-transform ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.002-1.06z" />
                  </svg>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-black border border-gray-800 rounded-xl shadow-lg z-30">
                    <Link
                      to="/my-courses"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-gray-800 transition"
                    >
                      <FolderOpenIcon className="w-5 h-5 text-indigo-400" />
                      My Courses
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-gray-800 transition"
                    >
                      <UserIcon className="w-5 h-5 text-indigo-400" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-6 py-3 text-rose-500 hover:bg-gray-800 transition"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-indigo-600 rounded text-white font-medium hover:bg-indigo-500 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-3 px-4 py-2 border border-indigo-600 rounded text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-indigo-400 focus:outline-none"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {[
              { to: "/", label: "Home" },
              { to: "/aptitude-test", label: "Aptitude Test" },
              { to: "/course-explorer", label: "Course Explorer" },
              { to: "/college-directory", label: "Colleges" },
              { to: "/timeline", label: "Timeline" },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded text-white hover:bg-gray-800 transition"
              >
                {label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="px-3 py-2 text-white font-medium">Hi, {user.name}</div>
                <Link
                  to="/my-courses"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded text-white hover:bg-gray-800"
                >
                  <FolderOpenIcon className="w-5 h-5 text-indigo-400" />
                  My Courses
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded text-white hover:bg-gray-800"
                >
                  <UserIcon className="w-5 h-5 text-indigo-400" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded text-rose-500 hover:bg-gray-800"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded text-white hover:bg-gray-800"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
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
