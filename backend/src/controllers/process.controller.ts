import { Request, Response } from "express";
import { processWithAI } from "../services/ai.service";

export const processCSV = async (
  req: Request,
  res: Response
) => {
  try {
    const { rows } = req.body;

    // Validate request
    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Rows are required",
      });
    }

    console.log("=================================");
    console.log("🚀 Received CSV Rows:", rows.length);
    console.log("=================================");

    // AI Processing
    const result = await processWithAI(rows);

    console.log("=================================");
    console.log("✅ AI Processing Completed");
    console.log(result);
    console.log("=================================");

    return res.status(200).json({
      success: true,
      totalRecords: result.totalRecords,
      imported: result.imported,
      skipped: result.skipped,
      failedBatches: result.failedBatches,
      rows: result.data,
    });

  } catch (error: any) {
    console.error("=================================");
    console.error("❌ AI Processing Error");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error?.message || "AI Processing Failed",
    });
  }
};