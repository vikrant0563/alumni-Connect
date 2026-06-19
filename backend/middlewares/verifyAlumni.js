import jwt from "jsonwebtoken";
import { Alumni } from "../models/Alumni.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyAlumni = asyncHandler(async (req, _, next) => {

    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

        if(!token){
          throw new ApiError(400,"Unauthorized request");
        }
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      const alumni = await Alumni.findById(decoded?._id).select("-password -refreshToken");

      if(!alumni){
        throw new ApiError(400,"Invalid Access Token")
      }

      req.alumni = alumni
    
      next();
    } catch (error) {
      throw new ApiError(401, error?.message || "invalid access token");
    }
});
