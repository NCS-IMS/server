import { findMain } from '../controller/direction/findDirectionController';
import express from 'express'
const router = express.Router();

//근처 병원 찾기
router.post('/hospital', findMain)

//근처 약국 찾기
router.post('/pharmacy', findMain)

export default router;