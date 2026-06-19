import mongoose from "mongoose";

const subEventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: Date,
  teamLimit: Number,
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      teamName: String,
    },
  ],
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["MPL", "Freshers", "Guest Talk", "Sports Day", "Workshop", "Seminar"],
      required: true,
    },
    image: {
      type: String,
    },
    cloudinaryPublic_id: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    rsvps: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        userType: {
          type: String,
          enum: ["User"],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    subEvents: [subEventSchema],
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model("Event", eventSchema);
