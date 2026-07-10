import { Router } from "express";
import { processCSV } from "../controllers/process.controller";

const router = Router();

router.post("/process", processCSV);

export default router;