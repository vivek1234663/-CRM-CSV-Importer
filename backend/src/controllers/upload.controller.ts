import { Request, Response } from "express";
import fs from "fs";

import { parseCSV } from "../services/csvservice";

export const uploadCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No CSV uploaded",
      });
      return;
    }

    // Debug logs (Render Logs me dikhenge)
    console.log("Current Working Directory:", process.cwd());
    console.log("Uploaded File:", req.file);
    console.log("File Path:", req.file.path);
    console.log("File Exists:", fs.existsSync(req.file.path));

    // Check if file actually exists
    if (!fs.existsSync(req.file.path)) {
      res.status(500).json({
        success: false,
        message: "Uploaded file not found on server.",
      });
      return;
    }

    // Parse CSV
    const rows = await parseCSV(req.file.path);

    // Delete uploaded file after parsing
    try {
      fs.unlinkSync(req.file.path);
      console.log("Temporary file deleted successfully.");
    } catch (err) {
      console.error("Unable to delete file:", err);
    }

    res.status(200).json({
      success: true,
      totalRows: rows.length,
      preview: rows,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to parse CSV",
      error: error instanceof Error ? error.message : error,
    });
  }
};