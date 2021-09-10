import * as scheduleController from '../controller/fireStation/scheduleController';
import express from 'express'
const router = express.Router();

// EM SCHEDULE 일반적 추가
router.post('/create', scheduleController.createSchedule)

// 다대다 추가
router.post('/add', scheduleController.addSchedule)

router.post('/find/one', scheduleController.findSchedule)

router.post('/find/carNum', scheduleController.findScheduleByCarNum)
// guestBookRouter.get('/main', guestBookMain)

export default router;