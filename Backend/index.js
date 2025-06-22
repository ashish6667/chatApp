import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://chat-app-frontend.vercel.app" // add your frontend domain here
    ],
    credentials: true,
  })
);

// Test route to fix "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Database connection
const PORT = process.env.PORT || 4001;
const URI = process.env.MONGODB_URI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// Start server
server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
