import { Alumni } from "../models/Alumni.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshtokens = async (alumniId) =>{
  try{
    const alumni = await Alumni.findById(alumniId);

    const accessToken = alumni.generateAccessToken()
    const refreshToken = alumni.generateRefreshToken()

    alumni.refreshToken = refreshToken;

    await alumni.save({validateBeforeSave:false});
    return {accessToken,refreshToken}
  }catch(error){
    throw new ApiError(500,"something went wrong!!!");
  }
}

// Register Alumni
 const registerAlumni = asyncHandler(async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
      graduationYear,
      fieldOfStudy,
      degree,
      currentJobTitle,
      currentLocation,
    } = req.body;

    if (
      [
        fullname,
        email,
        password,
        graduationYear,
        fieldOfStudy,
        degree,
        currentJobTitle,
        currentLocation,
      ].some((field) => field?.trim() === "")
    ) {
      throw new ApiError(400, "all fields are required !!!");
    }
    // Check if the email already exists
    const existingAlumni = await Alumni.findOne({ email });
    if (existingAlumni) {
      throw new ApiError(400, "User with email already exists");
    }

    const profilePictureLocalPath = req.file?.path;
    //console.log(profilePictureLocalPath)
    if (!profilePictureLocalPath) {
      throw new ApiError(400, "profile picture file is required");
    }

    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath);
    // console.log(profilePicture.url)

    if (!profilePicture) {
      throw new ApiError(400, "profile is not uploaded on cloudinary");
    }

    // Create new alumni instance
    const alumni = new Alumni({
      fullname,
      email,
      password,
      graduationYear,
      fieldOfStudy,
      degree,
      currentJobTitle,
      currentLocation,
      profilePicture: profilePicture.url,
      cloudinaryPublic_id: profilePicture.public_id,
    });

    // Save the alumni in the database
    await alumni.save();

    const createdAlumni = await Alumni.findById(alumni._id).select(
      "-password -refreshToken"
    );

    if (!createdAlumni) {
      throw new ApiError(
        400,
        "something went wrong while registering the alumni"
      );
    }

    res
      .status(201)
      .json(
        new ApiResponse(200, createdAlumni, "Alumni registered successfully")
      );
  } catch (error) {
    if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: error.data || null,
    });
  }
    console.error("Error during signup:", error);
    res.status(500).json({
      error: "Server error during signup",
    });
  }
});

// Login Alumni
 const loginAlumni = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email){
      throw new ApiError(400,"email is required")
    }

    // Check if alumni exists
    const alumni = await Alumni.findOne({ email });
    if (!alumni) {
      throw new ApiError(401, " email is required");
    }

    // Check if the password is correct
    const isPasswordCorrect = await alumni.isPasswordCorrect(password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new ApiError(402, "invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshtokens(
      alumni._id
    );

    const loggedAlumni = await Alumni.findById(alumni._id).select("-password -refreshToken")

    const options = {
      httpOnly: true,
      secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          alumni:loggedAlumni,
          accessToken,
          refreshToken,
        },
        "Alumni loggedin successfully"
      )
    );
  } catch (error) {
     if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: error.data || null,
    });
  }
    console.error("Error during login:", error);
    res.status(500).json({
      error: "Server error during login",
    });
  }
});


const alumniLoggedOut = asyncHandler(async (req,res)=>{
  console.log(req.alumni._id);

  await Alumni.findByIdAndUpdate(
    req.alumni._id,
    {
      $unset:{
        refreshToken:1, // this removes the field from document
      },
    },
    {
      new:true,
    }
  );

  const options = {
    httpOnly:true,
    secure:true,
  };

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"Alumni logged out"));
})

// Get all registered alumni
 const getAllAlumni = async (req, res) => {
  try {
    const alumni = await Alumni.find();
    res.status(200).json(alumni);
  } catch (error) {
    res.status(500).json({ message: "Error fetching alumni", error });
  }
};


// Refresh Access Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(400, "Unauthorized request!!!");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const alumni = await Alumni.findById(decodedToken?._id);
    if (!alumni) {
      throw new ApiError(401, "invalid refesh token");
    }
    // console.log(incomingRefreshToken)
    // console.log(user.refreshToken)
    if (incomingRefreshToken !== alumni?.refreshToken) {
      throw new ApiError(402, "Refresh token expired or used");
    }

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshtokens(alumni._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "AccessToken refreshed"
        )
      );
  } catch (error) {
    new ApiResponse(401, error?.message || "Invalid refresh token");
  }
});

/// fast searchessss

const fastSearchAlumni = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === "") {
    throw new ApiError(400, "Search query is required");
  }

  const searchRegex = new RegExp(query, "i"); // case-insensitive partial match

  const results = await Alumni.find({
    $or: [
      { fullname: { $regex: searchRegex } },
      { email: { $regex: searchRegex } },
      { fieldOfStudy: { $regex: searchRegex } }
    ]
  })
    .select("fullname email graduationYear fieldOfStudy currentJobTitle profilePicture") // only needed fields
    .limit(10); // limit results for speed

  return res
    .status(200)
    .json(new ApiResponse(200, results, "Fast search results"));
});

const changeCurrentPass = asyncHandler(async(req,res)=>{
  const {password,changedPassword} = req.body;
  const alumni = await Alumni.findById(req.alumni?._id);
  const isPasswordCorrect = await alumni.isPasswordCorrect(password);

  if(!isPasswordCorrect){
    throw new ApiError(400,"invalid old password")
  }

  alumni.password = changedPassword;
  await alumni.save({validateBeforeSave:false})

  return res
  .status(200)
  .json(new ApiResponse(200,{},"password changed successfully"))
})

const getCurrentAlumni = asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(new ApiResponse(200,req.alumni,"Alumni fetched successfully"))
})

const updateAlumniDetails = asyncHandler(async(req,res)=>{
  const {fullname,email,currentJobTitle,currentLocation} = req.body;
  if (
    [
      fullname,
      email,
      currentJobTitle,
      currentLocation,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all fields are required !!!");
  }
  const alumni = await Alumni.findByIdAndUpdate(
    req.alumni?._id,
    {
      $set:{
        fullname,
        email,
        currentJobTitle,
        currentLocation
      },
    },
    {
      new:true
    }
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200,alumni,"Account details updated successfully"))

})

const updateAlumniProfile = asyncHandler(async(req,res)=>{
  const localPath = req.file?.path;

  if(!localPath){
    throw new ApiError(400,"Profile is missing")
  }

  const alumni = await Alumni.findById(req.alumni._id);

  if(alumni.cloudinaryPublic_id){
    const cloudinaryResponse = await cloudinary.uploader.destroy(user.cloudinaryPublic_id);
    console.log("old profile deleted: ",cloudinaryResponse)
  }

  const profile = await uploadOnCloudinary(localPath);
  if(!profile.url){
    throw new ApiError(400,"error while uploading on cloudinary")
  }

  const updateAlumni = await alumni.findByIdAndUpdate(
    req.alumni?._id,
    {
      $set:{
        profilePicture:profile.url,
        cloudinaryPublic_id:profile.public_id,
      },
    },
    {
      new:true
    }
  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200,updateAlumni,"Profile image updated successfully"))
})

export {
  registerAlumni,
  loginAlumni,
  alumniLoggedOut,
  getAllAlumni,
  fastSearchAlumni,
  refreshAccessToken,
  changeCurrentPass,
  getCurrentAlumni,
  updateAlumniDetails,
  updateAlumniProfile
}