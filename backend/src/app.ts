import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/upload.routes";
import processRoutes from "./routes/process.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
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