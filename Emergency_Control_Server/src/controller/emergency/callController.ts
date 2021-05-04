import { Request, Response, NextFunction } from 'express'
import { write_log } from "../../service/emergency/callService";
import { find_hospital, find_userLocation } from "../../service/apis/findLocation";
import { sendPushMessageIndividual } from "../../middleware/sendPushMessage";
import { callLogDto } from "../../interface/callLogDto";

async function callMain(req: Request, res: Response) {
    try{
        let bodyData: callLogDto = {
            "kakaoId": req.body.kakaoId,
            "state": req.body.state,
            "is_self": req.body.is_self,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
        }
        await sendPushMessageIndividual(`${bodyData.state}환자 발생!!`, `${await find_userLocation(bodyData)}에 응급상황이 발생하였습니다.`, [
            "edJhijkqQ-mEgTt7bONnrh:APA91bGPHLda78vBSVzCqqZTk0ij4iu8x0m4nc27pzRsbF7xzV6LCymFZYOlvezoWbQK_CwmIbwgf_cVI-BHPy5gSq9hesyWe04TbpMUDl7T92k4MA9eaH5fOCNgSuGDMARlfpfXzEnm",
            "f6_TfMnCQUG6ut7sbTLziX:APA91bGgcN1sjZ5WBYgL_67ITKirjoFVYCGwWAI9ZX9eTM0OUF8oZdiKbu1fn9kSEo7NapvwzN407Zz5nsZg-zXEnFjzem4ZZkfnMgOV1LYBy93HNH7NUNXNPCCc2ao3P4u--0yp8RGB"
        ])  //푸시메시지 전송

        await write_log(bodyData)       //로그 저장
        await find_hospital(bodyData)   //병원 찾기
        .then(
            (result:any)=>{
                // console.log(result)
                res.status(200).json({ 
                    "message": "성공하였습니다.",
                    "result": result
                 })
            }
        )
    }catch(errMsg){
        res.status(500).json({ "message": errMsg })
    }
    // sendPushMessageGroup("asdf","fdsa","test")
    
}

export {
    callMain,
}