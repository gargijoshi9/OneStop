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
      <div className="max-w-xl mx-auto mt-16 p-8 bg-gray-50 rounded text-center">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
        <p>Please log in to view your settings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded shadow text-gray-800">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
      <div className="mb-8">
        <div>
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Settings;
