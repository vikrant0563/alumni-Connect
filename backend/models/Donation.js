import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  alumniId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumni",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentIntentId: { 
    type: String, required: true
 },
  donationType: {
    type: String,
    enum: ['one-time', 'recurring'],
    required: true,
  },
  profilePicture: { 
    type: String, // Profile picture path
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Donation = mongoose.model('Donation', DonationSchema);
