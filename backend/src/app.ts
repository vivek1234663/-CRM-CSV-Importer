import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/upload.routes";
import processRoutes from "./routes/process.routes";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://crm-csv-importer-kqgm.vercel.app",
  "https://crm-csv-importer-8941.vercel.app",
];

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("Blocked Origin:", origin);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Handle preflight requests<<<<<<< HEAD
app.options(/.*/, cors());

app.options(/.*/, cors(corsOptions));


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
 
