import { findLogs } from '../controller/fireStation/scheduleController';
import express from 'express'
const router = express.Router();

router.post('/log', findLogs)

// guestBookRouter.get('/main', guestBookMain)

export default router;