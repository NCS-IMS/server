import * as userController from '../controller/user/userController';
import express from 'express'
const router = express.Router();

var upload = require('../middleware/multer');

//User 추가
router.post('/create',userController.createUser)

// router.post(
//     '/create',
//     upload.fields([{name:'imgSrc', maxCount:1}]),
//     userController.createUser
//)

router.get('/searchAll', userController.findAllUser)
router.get('/detail', userController.findOneUser)

router.post(
    '/update',
    upload.fields([{name:'imgSrc', maxCount:1}]),
    userController.updateUser
)
router.post('/delete', userController.deleteUserFlag)

// guestBookRouter.get('/main', guestBookMain)

export default router;