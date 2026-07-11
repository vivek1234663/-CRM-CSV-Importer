import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/upload.routes";
import processRoutes from "./routes/process.routes";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://crm-csv-importer-8941.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Postman ya server-to-server requests ke liye
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 GrowEasy Backend Running...",
  });
});

app.use("/api", uploadRoutes);
app.use("/api", processRoutes);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
