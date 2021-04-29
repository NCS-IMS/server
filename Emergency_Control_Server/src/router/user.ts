import * as callController from '../controller/emergency/callController';
import express from 'express'
const router = express.Router();

router.post('/', callController.callMain)

// guestBookRouter.get('/main', guestBookMain)

export default router;