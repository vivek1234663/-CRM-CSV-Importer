import fs from "fs";
import Papa from "papaparse";

export const parseCSV = async (filePath: string) => {
  const file = fs.readFileSync(filePath, "utf8");

  const parsed = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });

  return parsed.data;
};