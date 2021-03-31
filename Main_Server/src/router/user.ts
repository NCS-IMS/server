import * as userController from '../controller/user/userController';
import express from 'express'
const router = express.Router();

var upload = require('../middleware/multer');
router.post(
    '/create',
    upload.fields([{name:'imgSrc', maxCount:1}]),
    userController.createUser
)

// guestBookRouter.get('/main', guestBookMain)

export default router;