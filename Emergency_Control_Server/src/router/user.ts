import { findLogs, createEmMan } from '../controller/fireStation/scheduleController';

import express from 'express'
const router = express.Router();

router.post('/log', findLogs)

//module Exports
var upload = require('../middleware/multer');
router.post(
    '/create',
    upload.fields([{name:'profile_image', maxCount:1}]),
    createEmMan
)
// guestBookRouter.get('/main', guestBookMain)

export default router;