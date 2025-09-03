import { FolderOpenIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

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
    <nav className="bg-white dark:bg-black shadow-md dark:shadow-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-indigo-300">
              sAarthI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {[
              { to: '/', label: 'Home' },
              { to: '/aptitude-test', label: 'Aptitude Test' },
              { to: '/course-explorer', label: 'Course Explorer' },
              { to: '/college-directory', label: 'Colleges' },
              { to: '/timeline', label: 'Timeline' },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400"
              >
                {label}
              </Link>
            ))}

            {/* User Profile Dropdown */}
            {user ? (
              <div className="relative ml-6" ref={profileRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-gray-800 border-2 border-green-400 text-indigo-700 dark:text-cyan-300 font-bold">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">{user.name}</span>
                  <svg
                    className="ml-1 h-4 w-4 text-gray-600 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.23 8.27a.75.75 0 01.002-1.06z" />
                  </svg>
                </button>

               {profileOpen && (
  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl py-2 z-30">
    <Link
      to="/my-courses"
      className="flex items-center gap-3 px-6 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 group transition"
      onClick={() => setProfileOpen(false)}
    >
      <FolderOpenIcon className="h-6 w-6 text-yellow-400 group-hover:text-yellow-500 transition" />
      My Courses
    </Link>
    <Link
      to="/settings"
      className="flex items-center gap-3 px-6 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 group transition"
      onClick={() => setProfileOpen(false)}
    >
      <UserIcon className="h-6 w-6 text-violet-600 group-hover:text-violet-700 transition" />
      Profile
    </Link>
    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-6 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 group transition text-left"
    >
      <ArrowRightOnRectangleIcon className="h-6 w-6 text-rose-500 group-hover:text-rose-600 transition" />
      Logout
    </button>
  </div>
)}

              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white dark:text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-2 px-4 py-2 rounded-md text-sm font-medium text-blue-600 dark:text-cyan-300 bg-white dark:bg-black border border-blue-600 dark:border-cyan-400 hover:bg-blue-50 dark:hover:bg-gray-800"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 focus:outline-none"
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black pb-3 px-2 pt-2">
          <div className="flex flex-col space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/aptitude-test', label: 'Aptitude Test' },
              { to: '/course-explorer', label: 'Course Explorer' },
              { to: '/college-directory', label: 'Colleges' },
              { to: '/timeline', label: 'Timeline' },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}

            {user ? (
              <>
                <span className="block px-6 py-2 font-semibold text-base text-gray-900 dark:text-cyan-200">
                  Hi, {user.name}
                </span>
                <Link
                  to="/my-courses"
                  className="flex items-center gap-3 px-6 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 group transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FolderOpenIcon className="h-6 w-6 text-yellow-400 group-hover:text-yellow-500 transition" />
                  My Courses
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-6 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 group transition"
                  onClick={() => setIsOpen(false)}
                >
                  <UserIcon className="h-6 w-6 text-violet-600 group-hover:text-violet-700 transition" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-6 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 group transition text-left"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-rose-500 group-hover:text-rose-600 transition" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block w-full px-6 py-3 mt-2 rounded-lg text-base font-medium text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 dark:text-white shadow transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full mt-2 px-6 py-3 rounded-lg text-base font-medium text-blue-600 dark:text-cyan-300 border border-blue-600 dark:border-cyan-400 bg-white dark:bg-black hover:bg-blue-50 dark:hover:bg-gray-800 shadow transition text-center"
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