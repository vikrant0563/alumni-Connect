import React from "react";

const EventCard = ({ title, image, date, type, description }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col">
      <img src={image} alt={title} className="w-full h-40 rounded-xl object-cover" />
      <div className="mt-3 flex-1">
        <span className="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
          {type}
        </span>
        <h3 className="text-lg font-semibold mt-2">{title}</h3>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
      </div>
      <div className="mt-3 text-sm text-gray-400">📅 {date}</div>
    </div>
  );
};

export default EventCard;
