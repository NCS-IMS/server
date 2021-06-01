import { 
    findLogs,
    createEmMan, 
    modifyImageEmMan, 
    modifyRestoreEmMan, 
    findFirestation, 
    modifyFireStationIdEmMan
 } from '../controller/fireStation/scheduleController';

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
router.post('/modify/restore', modifyRestoreEmMan )
// guestBookRouter.get('/main', guestBookMain)

// 회원가입 시 Firestation 확인
router.get('/find/firestation', findFirestation)


// FireStation ID 변경 
router.post('/modify/fsid',modifyFireStationIdEmMan)


export default router;