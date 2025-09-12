import {
  FolderOpenIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  BeakerIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  CalendarDaysIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  UserPlusIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
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
    navigate("/");
  };

  const toggleMobileMenu = () => setIsOpen((prev) => !prev);
  const toggleProfileMenu = () => setProfileOpen((prev) => !prev);

  // Links for when the user is logged out
  const loggedOutLinks = [
    { to: "/", label: "Home", icon: <HomeIcon className="w-5 h-5" /> },
    { to: "/aptitude-test", label: "Aptitude Test", icon: <BeakerIcon className="w-5 h-5" /> },
    { to: "/course-explorer", label: "Course Explorer", icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    { to: "/college-directory", label: "Colleges", icon: <BuildingOfficeIcon className="w-5 h-5" /> },
    { to: "/timeline", label: "Timeline", icon: <CalendarDaysIcon className="w-5 h-5" /> },
  ];
  
  // Links for when the user is logged in
  const loggedInLinks = [
    { to: "/dashboard", label: "Dashboard", icon: <ComputerDesktopIcon className="w-5 h-5" /> },
    { to: "/aptitude-test", label: "Aptitude Test", icon: <BeakerIcon className="w-5 h-5" /> },
    { to: "/course-explorer", label: "Course Explorer", icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    { to: "/college-directory", label: "Colleges", icon: <BuildingOfficeIcon className="w-5 h-5" /> },
    { to: "/timeline", label: "Timeline", icon: <CalendarDaysIcon className="w-5 h-5" /> },
  ];

  const navLinks = isAuthenticated ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-lg text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              UjjwAl
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition duration-200 font-medium ${
                    isActive ? 'text-indigo-400' : 'text-white hover:text-indigo-400'
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                    {user?.name ? user.name[0].toUpperCase() : <UserIcon className="w-5 h-5" />}
                  </div>
                  <span className="text-white font-medium">{user?.name}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-white transition-transform ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-black border border-gray-800 rounded-xl shadow-lg z-30">
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-6 py-3 text-white hover:bg-gray-800 transition"
                    >
                      <ComputerDesktopIcon className="w-5 h-5 text-indigo-400" />
                      Dashboard
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
                      className="flex items-center gap-3 w-full text-left px-6 py-3 text-rose-500 hover:bg-gray-800 transition"
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded text-white font-medium hover:bg-indigo-500 transition"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-3 inline-flex items-center gap-2 px-4 py-2 border border-indigo-600 rounded text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition"
                >
                  <UserPlusIcon className="w-5 h-5" />
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
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded transition ${
                    isActive ? 'bg-gray-800 text-white' : 'text-white hover:bg-gray-800'
                  }`
                }
              >
                {icon}
                {label}
              </NavLink>
            ))}

            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <Link to="/settings" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded text-white hover:bg-gray-800">
                  <UserIcon className="w-5 h-5 text-indigo-400" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-3 py-2 rounded text-rose-500 hover:bg-gray-800"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-700 my-2"></div>
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded text-white bg-indigo-600 hover:bg-indigo-500">
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-3 px-3 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white">
                  <UserPlusIcon className="w-5 h-5" />
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

