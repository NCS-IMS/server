import * as callController from '../controller/emergency/callController';
import { Request, Response, NextFunction } from 'express'
import request from 'request';
import express from 'express'
const router = express.Router();

router.post('/', (req: Request, res: Response)=>{
    const options = {
        uri:'https://dapi.kakao.com/v2/local/search/category.json?category_group_code=HP8&radius=20000&x=127.077176&y=36.736134', 
        method: 'GET',
        body: {
          priority:'high',
        //   to:...,
        },
        json:true,
        headers: { Authorization: `	KakaoAK 1dad36ef97296e3f433373c406ff7a29` },
      }
      request.post(options, function(err,httpResponse,body){
        console.log(body)
      })
})

// guestBookRouter.get('/main', guestBookMain)

export default router;