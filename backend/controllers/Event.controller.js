import { Event } from "../models/Event.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//=============================================================for students ============================================

// View All Public Events
 const getAllPublicEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.status(200).json(new ApiResponse(200, events));
});

// RSVP to an Event
const rsvpToEvent = asyncHandler(async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  const alreadyRSVP = event.rsvps.some(
    (r) => r.userId.toString() === userId.toString()
  );
  if (alreadyRSVP) throw new ApiError(400, "Already RSVPed");

  event.rsvps.push({ userId, userType: "User" });
  await event.save();

  res.status(200).json(new ApiResponse(200, null, "RSVP successful"));
});

// Cancel RSVP
 const cancelRSVP = asyncHandler(async (req, res) => {
  const { id: eventId } = req.params;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  event.rsvps = event.rsvps.filter(
    (r) => r.userId.toString() !== userId.toString()
  );
  await event.save();

  res.status(200).json(new ApiResponse(200, null, "RSVP cancelled"));
});

// View My RSVP Events
const getMyRSVPEvents = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const events = await Event.find({ "rsvps.userId": userId });
  res.status(200).json(new ApiResponse(200, events));
});

// Join Sub-Event
 const joinSubEvent = asyncHandler(async (req, res) => {
  const { eventId, subId } = req.params;
  const { teamName } = req.body;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  const subEvent = event.subEvents.id(subId);
  if (!subEvent) throw new ApiError(404, "Sub-event not found");

  const alreadyJoined = subEvent.participants.some(
    (p) => p.userId.toString() === userId.toString()
  );
  if (alreadyJoined) throw new ApiError(400, "Already joined this sub-event");

  subEvent.participants.push({ userId, teamName });
  await event.save();

  res.status(200).json(new ApiResponse(200, null, "Joined sub-event"));
});

export{
    getAllPublicEvents,
    rsvpToEvent,
    cancelRSVP,
    getMyRSVPEvents,
    joinSubEvent
}