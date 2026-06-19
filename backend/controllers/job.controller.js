import { Job } from "../models/Job.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


//Alumni: Create a Job

export const createJob = asyncHandler(async (req, res) => {
  const { title, company, location, jobType, description, applyLink, salaryRange } = req.body;

  if (!title || !company || !location || !description || !applyLink) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  const job = await Job.create({
    title,
    company,
    location,
    jobType,
    description,
    applyLink,
    postedBy: req.alumni._id,
    salaryRange
  });

  res.status(201).json(new ApiResponse(201, job, "Job posted successfully"));
});

//Users: Get All Jobs (Public View)
export const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().populate("postedBy", "fullname email");
  res.status(200).json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
});


//Get Job by ID (Details)
export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("postedBy", "fullname email");
  if (!job) {
    throw new ApiError(404, "Job not found");
  }
  res.status(200).json(new ApiResponse(200, job, "Job fetched successfully"));
});


//Alumni: Update a Job
export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.postedBy.toString() !== req.alumni._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this job");
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json(new ApiResponse(200, updatedJob, "Job updated successfully"));
});


// Alumni: Delete a Job

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  if (job.postedBy.toString() !== req.alumni._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this job");
  }

  await job.deleteOne();

  res.status(200).json(new ApiResponse(200, {}, "Job deleted successfully"));
});
