import express from "express";
import {
  getAllAlumni,
  registerAlumni,
  loginAlumni,
  fastSearchAlumni,
  refreshAccessToken,
  alumniLoggedOut,
  changeCurrentPass,
  getCurrentAlumni,
  updateAlumniDetails,
  updateAlumniProfile
} from "../controllers/Alumni.js";

import {upload} from "../middlewares/uploadMiddleware.js";
import { verifyAlumni } from "../middlewares/verifyAlumni.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";

const router = express.Router();


// Alumni Registration Route
router.post("/register",upload.single('profilePicture'), registerAlumni);
router.post("/login", loginAlumni);

//SECURED ROUTES

router.get('/get-all-alumni',getAllAlumni)
router.get("/search-alumni", fastSearchAlumni);
router.post('/logout',verifyAlumni,alumniLoggedOut)
router.post("/refresh-token", refreshAccessToken);
router.post("/changePassword",verifyAlumni,changeCurrentPass)
router.get("/current-alumni",verifyAlumni,getCurrentAlumni)
router.patch("/update-alumni-details",verifyAlumni,updateAlumniDetails)
router.patch("/update-alumni-profile",verifyAlumni,upload.single('profilePicture'),updateAlumniProfile)

export default router;
