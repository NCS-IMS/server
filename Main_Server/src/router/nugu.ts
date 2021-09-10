import { findAid, enrollUser, emergencyCall} from "../controller/aid/nuguController";
import express from "express";
const router = express.Router();

router.post("/answer.emergency", findAid);

router.post("/answer.userEnroll", enrollUser);

router.post("/answer.EmergencyCall", emergencyCall);

export default router;