import express from "express"

import {registerUser,loginUser,logoutUser,refreshAccessToken,getUserProfile} from "../controllers/User.controller.js";
import { verifyUser } from "../middlewares/verifyUser.middleware.js";

const router  = express.Router();

router.post("/register-user",registerUser);
router.post("/login",loginUser);

// authorized path

router.get("/logout",verifyUser,logoutUser);
router.get("/user-profile",verifyUser,getUserProfile);

export default router;