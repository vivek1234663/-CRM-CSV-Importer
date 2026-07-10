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

    const rows = await parseCSV(req.file.path);

    fs.unlinkSync(req.file.path);

    res.json({
      success: true,

      totalRows: rows.length,

      preview: rows,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to parse CSV",
    });
  }
};