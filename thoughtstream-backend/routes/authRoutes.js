//Defines authentication routes for the ThoughtStream app using Google OAuth2 via Passport.js

import express from "express";
import { handleGoogleLogin } from "../controllers/authController.js";
//Create a new Express router instance
const router = express.Router();

//uses Google Auth Library to verify google credential from frontend and generate signed JWT
router.post("/google", handleGoogleLogin); // POST /api/auth/google

export default router;
