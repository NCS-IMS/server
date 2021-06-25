import { findAid, enrollUser } from "../controller/aid/nuguController";
import express from "express";
const router = express.Router();

router.post("/answer.emergency", findAid);

router.post("/answer.userEnroll", enrollUser);

export default router;