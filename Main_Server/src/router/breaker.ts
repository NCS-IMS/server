import {searchCarNumber} from "../controller/breaker/breakerController";
import express from "express";
const router = express.Router();

router.get("/searchCarNum", searchCarNumber);

export default router;