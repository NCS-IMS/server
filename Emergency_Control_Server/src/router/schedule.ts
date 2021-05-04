import * as scheduleController from '../controller/fireStation/scheduleController';
import express from 'express'
const router = express.Router();

router.post('/create', scheduleController.addSchedule)

router.post('/find/one', scheduleController.findSchedule)
// guestBookRouter.get('/main', guestBookMain)

export default router;