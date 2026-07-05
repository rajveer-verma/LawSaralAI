import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/database.js";
import { createCollection } from "./src/services/vectorService.js";

import userRoutes from "./src/routes/userRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import chatRoutes from "./src/routes/chatRoutes.js";

dotenv.config();

const app = express();

// ======================================
// Middlewares
// ======================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ======================================
// Routes
// ======================================

app.use("/api/users", userRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/chat", chatRoutes);

// ======================================
// Health Check
// ======================================

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "LawSaral Backend Running 🚀",
  });
});

// ======================================
// 404 Route
// ======================================

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ======================================
// Global Error Handler
// ======================================

app.use((err, req, res, next) => {

  console.error("Server Error:", err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });

});

// ======================================
// Start Server
// ======================================

const PORT = process.env.PORT || 5000;

const startServer = async () => {

  try {

    await connectDB();

    await createCollection();

    app.listen(PORT, () => {

      console.log(
        `🚀 Server running on http://localhost:${PORT}`
      );

    });

  } catch (error) {

    console.error(
      "Server Startup Error:",
      error
    );

    process.exit(1);

  }

};

startServer();