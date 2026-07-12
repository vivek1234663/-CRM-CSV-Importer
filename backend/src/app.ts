import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/upload.routes";
import processRoutes from "./routes/process.routes";

dotenv.config();

const app = express();

// Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "https://crm-csv-importer-8941.vercel.app",
  "https://crm-csv-importer-kqqm.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, Render health checks, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ Blocked by CORS:", origin);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 GrowEasy Backend Running...",
  });
});

// Routes
app.use("/api", uploadRoutes);
app.use("/api", processRoutes);

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;