import express from "express";

import { loginUser } from "../controllers/userController.js";

const router = express.Router();

// ======================================
// Login / Register User
// ======================================

router.post(
  "/login",
  loginUser
);

export default router;