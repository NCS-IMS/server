import * as proxyBackController from '../controller/proxyBackController';
import express from 'express'
const router = express.Router();

router.post('/fcm/group',proxyBackController.sendPushMessageGroup)
router.post('/fcm/individual',proxyBackController.sendPushMessageIndividual)

// guestBookRouter.get('/main', guestBookMain)

export default router;