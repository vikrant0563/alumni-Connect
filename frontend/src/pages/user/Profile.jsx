import React from 'react';
import useAuth from '../../auth/useAuth';// your custom hook
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  Pencil,
  Mail,
  GraduationCap,
  UserCircle2,
  BadgeCheck,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
//   const { user } = useAuth();
   const user = {
    name: "Rohit Sharma",
    email: "rohit.sharma@example.com",
    branch:"CSE",
    passingYear:"2026",
    phone: "+91 98765 43210",
    website: "https://rohitsharma.dev",
    profilePic: "https://i.imgur.com/RNq2bMI.jpg",
  };


  const handleSave = () => {
    toast.success("Profile saved successfully!");
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
         style={{ backgroundImage: 'url(https://i.imgur.com/yYp7DNf.jpg)' }}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-8">
        <div className="text-2xl font-semibold mb-6 text-gray-700 border-b pb-3">Account Setting</div>

        {/* Tabs */}
        <div role="tablist" className="tabs tabs-bordered mb-6">
          <input type="radio" name="profileTabs" role="tab" className="tab" aria-label="Profile" defaultChecked />
          <div role="tabpanel" className="tab-content p-4">
            {/* Profile Content */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left - Image */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img src={"https://i.pravatar.cc/150?img=12"} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <button className="mt-4 btn btn-sm btn-outline btn-primary">Change</button>
              </div>

              {/* Right - Info */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Name</label>
                  <div className="flex items-center gap-2 text-gray-800">
                    <span>{user.name}</span>
                    <FaCheckCircle className="text-green-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Email</label>
                  <div className="flex items-center gap-2 text-gray-800">
                    <span>{user.email}</span>
                    <FaCheckCircle className="text-green-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Branch</label>
                  <div className="flex items-center gap-2 text-gray-800">
                    <span>{user.branch}</span>
                    <FaCheckCircle className="text-green-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Passing Year</label>
                  <div className="flex items-center gap-2 text-gray-800">
                    <span>{user.passingYear}</span>
                    <FaCheckCircle className="text-green-500" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-gray-600">Password</label>
                  <div className="flex items-center gap-2 text-gray-800">
                    <span>********</span>
                    <FaCheckCircle className="text-green-500" />
                  </div>
                </div>

                <div className="pt-4">
                 <Link to="/student/profile/edit">
          <button className="btn btn-outline btn-primary gap-2">
            <Pencil className="w-4 h-4" /> Edit Profile
          </button>
        </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
