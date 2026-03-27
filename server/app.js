// const express = require('express');
import express from "express";
import cors from "cors";
import helmet from "helmet";
import uploadRoues from "./routes/uploadRoutes.js";
const app = express();
app.set("trust proxy", 1); // Tell Express to trust the proxy headers ( for vercel prodcution later.)

// Middleware

// Speicify a list of allowed origins & config cors to allow them (prevent any dangerous requests)
// 1. Ensure your allowedOrigins are extremely clean
const allowedOrigins = [
  "http://localhost:7860",
  "http://localhost:5173",
  process.env.CLIENT_URL, // Make sure this is "https://your-app.vercel.app" (NO trailing /)
].filter(Boolean);

// 2. Use the "Array" method instead of the "Function" method
// This is much more reliable when headers are being proxied
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Added OPTIONS for preflight
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Explicitly allow these
  }),
);

// 3. Force handle the OPTIONS "Preflight" request
app.options(".*", cors());

// Security Headers to hide that you're using Express
// and prevents common attacks like Clickjacking.
app.use(helmet());

// Config the express server to parse incoming request
app.use(express.json()); // parse any incoming json so we can access the req.body
app.use(express.urlencoded({ extended: true })); //parse form data

// Upload routes
app.use("/image", uploadRoues);

// Basic Route for checing server
app.get("/", (req, res) => {
  res.json({
    status: "Everything is Ok",
  });
});

// Handle any wrong routes - 404 Page.
app.use((req, res, next) => {
  const error = new Error("404 : how did we get here?!");
  res.status(404);
  next(error);
});

// Global error handling
app.use((err, req, res, next) => {
  console.error("There was an error: ", err.message);

  // Handle Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      State: "Failed",
      ErrorMessage: "File is too large! Maximum limit is 4MB.",
    });
  }
  const statusCode =
    err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    State: "Failed",
    ErrorMessage: message,
    stack:
      process.env.NODE_ENV === "development"
        ? `Here is the error stack : ${err.stack}`
        : "we are not in development anymore, can't show the error here.",
  });
});

export default app;
