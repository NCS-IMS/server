import { findLogs, createEmMan, modifyImageEmMan, modifyRestoreEmMan } from '../controller/fireStation/scheduleController';

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

router.post(
    '/modify/image',
    upload.fields([{name:'profile_image', maxCount:1}]),
    modifyImageEmMan
)

// 앱 재설치 시 UUID와 Token 갱신을 위한 수정
router.post( '/modify/restore', modifyRestoreEmMan )
// guestBookRouter.get('/main', guestBookMain)

export default router;