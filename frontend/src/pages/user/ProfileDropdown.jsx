import React, { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../util.js";
import axios from "axios";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // get user directly from context

  const handleLogOut = async () => {
    try {
      console.log(user)
     const data =  await axios.get(
        `http://localhost:8001/${user.role.toLowerCase()}/logout`, 
        { withCredentials: true }
      );
      console.log(data);
      logout();
      handleSuccess("Logged out");
      navigate("/");
    } catch (error) {
      handleError(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="relative">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {user?.fullname ? user.fullname[0].toUpperCase() : "U"}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border z-50">
          <ul className="text-sm font-medium text-gray-700">
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/student/profile");
                setOpen(false);
              }}
            >
              My Profile
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/student/dashboard");
                setOpen(false);
              }}
            >
              Dashboard
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogOut}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
