import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
} from "../controllers/job.controller.js";

import {verifyAlumni } from "../middlewares/verifyAlumni.js";

const router = express.Router();

// For Students/Users
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// For Alumni (Protected)
router.post("/create", verifyAlumni, createJob);
router.put("/update/:id", verifyAlumni, updateJob);
router.delete("/delete/:id", verifyAlumni, deleteJob);

export default router;
