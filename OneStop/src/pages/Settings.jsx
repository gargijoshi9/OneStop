import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilSquareIcon,
  CameraIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const fileRef = useRef(null);

  const [details, setDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.mobile || "",
    address: user?.address || "",
    photo: user?.photoURL || "",
  });
  const [photoFile, setPhotoFile] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhotoFile(file);
      setDetails((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: save profile updates to backend here
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
    setDetails({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.mobile || "",
      address: user?.address || "",
      photo: user?.photoURL || "",
    });
    setPhotoFile(null);
  };

  if (!user) {
    return (
      <div className="max-w-xl mx-auto mt-24 p-10 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl text-center">
        <h2 className="text-3xl font-extrabold mb-4 text-gray-800 dark:text-cyan-200">
          Account Settings
        </h2>
        <p className="text-gray-700 dark:text-gray-300">Please log in to view your settings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-black to-[#101226] py-12">
      <div className="backdrop-blur-2xl bg-black/90 dark:bg-black/90 border border-gray-700 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative">
        {!editMode ? (
          <button
            className="absolute top-5 right-5 text-indigo-400 hover:text-indigo-200 transition"
            onClick={() => setEditMode(true)}
            title="Edit details"
          >
            <PencilSquareIcon className="h-6 w-6" />
          </button>
        ) : (
          <div className="absolute top-5 right-6 flex gap-2">
            <button
              onClick={handleSave}
              className="text-green-400 hover:text-green-300 transition"
              title="Save"
            >
              <CheckIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleCancel}
              className="text-rose-500 hover:text-rose-300 transition"
              title="Cancel"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <div
              className="relative w-24 h-24 group rounded-full overflow-hidden bg-gray-800 border-4 border-indigo-500 shadow cursor-pointer"
              onClick={() => {
                if (editMode) fileRef.current.click();
              }}
            >
              {details.photo ? (
                <img src={details.photo} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <UserCircleIcon className="w-full h-full text-indigo-400" />
              )}
              {editMode && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <CameraIcon className="h-8 w-8 text-white" />
                  <span className="text-white text-xs">Edit</span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handlePhotoChange}
                  />
                </div>
              )}
            </div>
            <div className="pt-2 text-gray-400 text-xs">Max size: 2MB. PNG/JPG.</div>
          </div>

          {/* Header */}
          <h2 className="text-3xl font-extrabold mb-3 text-white flex items-center gap-2">
            <UserCircleIcon className="h-8 w-8 text-indigo-400" />
            Account Settings
          </h2>

          {/* Details Table */}
          {!editMode ? (
            <table className="w-full text-white text-left border border-gray-600 rounded-lg">
              <tbody>
                <tr className="border-b border-gray-600">
                  <th className="p-3 font-semibold">Name</th>
                  <td className="p-3">{details.name}</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <th className="p-3 font-semibold">Email</th>
                  <td className="p-3">{details.email}</td>
                </tr>
                <tr className="border-b border-gray-600">
                  <th className="p-3 font-semibold">Phone</th>
                  <td className="p-3">{details.phone || <span className="text-gray-400">Not provided</span>}</td>
                </tr>
                <tr>
                  <th className="p-3 font-semibold">Address</th>
                  <td className="p-3">{details.address || <span className="text-gray-400">Not provided</span>}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold text-white" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={details.name}
                  onChange={handleEditChange}
                  className="w-full rounded px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-white" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={details.email}
                  onChange={handleEditChange}
                  className="w-full rounded px-3 py-2 text-black"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-white" htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={details.phone}
                  onChange={handleEditChange}
                  className="w-full rounded px-3 py-2 text-black"
                  pattern="[0-9]{10,15}"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold text-white" htmlFor="address">Address</label>
                <input
                  id="address"
                  name="address"
                  value={details.address}
                  onChange={handleEditChange}
                  className="w-full rounded px-3 py-2 text-black"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full mt-6 inline-block text-center bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-medium py-3 rounded-lg shadow transition"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
