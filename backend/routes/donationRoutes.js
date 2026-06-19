import express from "express";
import { createPaymentIntent,getAllDonatedAlumni } from "../controllers/donationController.js";
import { verifyAlumni } from "../middlewares/verifyAlumni.js";

const router = express.Router();

// Create payment intent (only accessible to logged-in users)
router.post("/create-payment-intent", verifyAlumni, createPaymentIntent);
router.get('/',getAllDonatedAlumni)

export default router;  
