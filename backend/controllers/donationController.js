import Stripe from "stripe";
import { Donation } from "../models/Donation.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Payment Intent
export const createPaymentIntent = async (req, res) => {
  const { amount, donationType } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // in cents
      currency: "usd",
      metadata: {
        donationType,
        alumniId: req.alumni._id.toString(), // Ensure alumni ID is passed
      },
    });

    // Store the donation details in the database
    const donation = await Donation.create({
      alumniId: req.alumni._id,
      amount,
      paymentIntentId: paymentIntent.id, // Store the Stripe payment intent ID
      donationType,
      profilePicture: req.alumni.profilePicture,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      donation,
      success: true,
    });
  } catch (error) {
    console.error("error msg:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getAllDonatedAlumni = async (req, res) => {
  try {
    const donateAlumni = await Donation.find();
    res.status(200).json(donateAlumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alumni", error });
  }
};
