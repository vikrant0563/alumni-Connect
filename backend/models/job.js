import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
      default: "Full-time"
    },
    description: {
      type: String,
      required: [true, "Job description is required"]
    },
    applyLink: {
      type: String,
      required: [true, "Apply link is required"]
    },
    salaryRange: {
      type: String, // e.g., "₹5 LPA - ₹10 LPA" or "$80k - $120k"
      default: "Not Disclosed"
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alumni",
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    expiresAt: {
      type: Date // Optional: for job expiry
    }
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
