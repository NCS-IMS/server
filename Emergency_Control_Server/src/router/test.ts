import * as callController from '../controller/emergency/callController';
import { Request, Response, NextFunction } from 'express'
import request from 'request';
import express from 'express'
const router = express.Router();
import  mqtt  from "mqtt";
router.post('/', (req: Request, res: Response)=>{
    let bodyData : any = {
        group_cord: "HP8",
        radius: 20000,
        x: req.body.latitude,
        y: req.body.longitude
    }
    const options = {
        uri:`https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${bodyData.group_cord}&radius=${bodyData.radius}&x=${bodyData.x}&y=${bodyData.y}`,
        method: 'GET',
        body: {
          priority:'high',
        //   to:...,
        },
        json:true,
        headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
      }
      request.post(options, function(err,httpResponse,body){
        console.log(body)
      })
})

// guestBookRouter.get('/main', guestBookMain)

export default router;