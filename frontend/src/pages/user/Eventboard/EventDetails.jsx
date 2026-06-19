import React from "react";
import { useParams } from "react-router-dom";
import { events } from "../data/eventsData";

const EventDetails = () => {
  const { categoryId, eventId } = useParams();
  const event = events[categoryId]?.find((e) => e.id === eventId);

  if (!event) {
    return <div className="p-8 text-red-500">Event not found!</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-lg shadow-md" />
      <h1 className="text-3xl font-bold mt-4">{event.title}</h1>
      <p className="text-gray-600 mt-2">{event.date} — {event.location}</p>
      <p className="mt-4 text-lg">{event.description}</p>
    </div>
  );
};

export default EventDetails;
