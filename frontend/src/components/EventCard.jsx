import { Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function EventCard({ event }) {
  const { id, title, date, location, description, image } = event;
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
    >
      {/* Event Image */}
      <div className="relative group cursor-pointer" onClick={() => navigate(`/events/${id}`)}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center gap-2">
          <Calendar size={16} /> {date}
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-gray-500 dark:text-gray-300 mb-3 text-sm gap-1">
          <MapPin size={16} /> {location}
        </div>

        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
          {description}
        </p>

        {/* Learn More Button */}
        <button
          onClick={() => navigate(`/events/${id}`)}
          className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Learn More
        </button>
      </div>
    </motion.div>
  );
}
