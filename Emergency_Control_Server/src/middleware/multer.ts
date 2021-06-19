// import { logger } from "../config/logger";
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req : Request, file : any, cb : any) {
      cb(null, 'public/upload/')
    },
    filename: function (req : any, file : any, cb : any) {
      let imgName :any = ''
      console.log(req.body)
      console.log(file)
      //이미지 존재 시 kakaoid.imageType 형식으로 지정
      //if(file.mimetype.split('/')[1] != undefined) imgName = `${req.body.kakaoId}.${file.mimetype.split('/')[1]}`
      if(file.mimetype.split('/')[1] != undefined) imgName = `${file.originalname}.${file.mimetype.split('/')[1]}`
      else imgName = undefined; //이미지 없을 시 null 할당
      cb(null, imgName) 
      // cb(null, file.originalname) 
    }
  })

var upload = multer({ storage: storage });

module.exports = upload;
