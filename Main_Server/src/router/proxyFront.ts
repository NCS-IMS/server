import * as proxyFront from '../controller/proxyFront';
import express from 'express'
const router = express.Router();

//응급상황 발생 시 응급구조사 호출
router.post('/emcall',proxyFront.emergencyManPushMessage)

export default router;