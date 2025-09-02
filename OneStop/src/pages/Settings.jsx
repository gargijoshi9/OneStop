import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // If no user is logged in, show a message
  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-16 p-6 bg-gray-50 rounded shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Account Settings</h2>
        <p>Please log in to view your settings.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-20">
      <div className="max-w-md w-full p-6 bg-blue-50 rounded-lg shadow-md text-gray-800">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Account Details
        </h2>

        {/* Table format */}
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-semibold text-gray-700 border-b border-gray-300">
                Full Name
              </td>
              <td className="px-4 py-2 text-gray-900 border-b border-gray-300">
                {user.name}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-gray-700 border-b border-gray-300">
                Email
              </td>
              <td className="px-4 py-2 text-gray-900 border-b border-gray-300">
                {user.email}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-gray-700 border-b border-gray-300">
                Mobile Number
              </td>
              <td className="px-4 py-2 text-gray-900 border-b border-gray-300">
                {user.mobile || "Not provided"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-gray-700">
                Address
              </td>
              <td className="px-4 py-2 text-gray-900">
                {user.address || "Not provided"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Logout link - arrow + underline only on text */}
        <div className="mt-4 text-left">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 transition-colors duration-200 font-normal flex items-center gap-2"
          >
            <span className="text-lg"></span>
            <span className="underline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
