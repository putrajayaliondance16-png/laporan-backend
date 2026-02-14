import express from "express";
import upload from "../middleware/upload.js";
import { verifyToken } from "../middleware/auth.js";
import { createReport } from "../controllers/reportController.js";

const router = express.Router();

router.post("/", verifyToken, upload.array("media"), createReport);

export default router;
