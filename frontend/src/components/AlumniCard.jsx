import React from "react";
import { Mail, MapPin, Briefcase, GraduationCap } from "lucide-react"; // icons

const AlumniCard = ({ alumni }) => {
  const {
    fullname,
    email,
    graduationYear,
    fieldOfStudy,
    degree,
    currentJobTitle,
    currentLocation,
    profilePicture,
  } = alumni;

  return (
  <div className="bg-white/80 backdrop-blur-md shadow-md rounded-2xl 
                overflow-hidden hover:shadow-xl transition-all duration-300 
                w-full max-w-sm mx-auto p-6 flex flex-col justify-between">
      {/* Profile Image */}
      <div className="flex justify-center">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt={fullname}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md transform transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center 
                       bg-gradient-to-r from-blue-500 to-purple-600 text-white text-3xl font-bold 
                       border-4 border-blue-300 shadow-md"
          >
            {fullname ? fullname.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>

      {/* Alumni Info */}
      <div className="text-center mt-4">
        <h2 className="text-lg font-bold text-gray-800">{fullname}</h2>
        {currentJobTitle && (
          <p className="text-sm text-blue-600 flex items-center justify-center gap-1">
            <Briefcase size={14} /> {currentJobTitle}
          </p>
        )}
        {currentLocation && (
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
            <MapPin size={14} /> {currentLocation}
          </p>
        )}
      </div>

      {/* Education Info */}
      <div className="mt-4 text-sm text-gray-700 space-y-1 text-center">
        <p className="flex items-center justify-center gap-1">
          <GraduationCap size={16} /> {degree || "Degree"} in {fieldOfStudy}
        </p>
        <p>🎉 Class of {graduationYear}</p>
      </div>

      {/* Contact (Email) */}
      <div className="mt-3 text-xs text-gray-500 text-center flex items-center justify-center gap-1">
        <Mail size={14} /> {email}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex justify-center gap-3">
        <button
          className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-200"
          onClick={() => alert(`Viewing profile of ${fullname}`)}
        >
          View Profile
        </button>
        <button
          className="px-4 py-2 text-sm font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-md"
          onClick={() => alert(`Connect request sent to ${fullname}`)}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default AlumniCard;
