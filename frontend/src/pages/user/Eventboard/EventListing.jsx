import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events, categories } from "../data/eventsData";

const EventListing = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const categoryEvents = events[categoryId] || [];
  const category = categories.find((c) => c.id === categoryId);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{category?.name} Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
            onClick={() => navigate(`/event/${categoryId}/${event.id}`)}
          >
            <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="text-gray-600">{event.date} — {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventListing;
