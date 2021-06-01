// import { logger } from "../config/logger";
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req : Request, file : any, cb : any) {
      cb(null, 'public/upload/')
    },
    filename: function (req : any, file : any, cb : any) {
      cb(null, `${req.body.kakaoId}.${file.mimetype.split('/')[1]}`) 
      // cb(null, file.originalname) 
    }
  })

var upload = multer({ storage: storage });

module.exports = upload;
