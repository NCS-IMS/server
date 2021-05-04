import { Request, Response, NextFunction } from 'express'
import * as callService from "../../service/emergency/callService";
import { sendPushMessageGroup, sendPushMessageIndividual } from "../../middleware/sendPushMessage";
import { logger } from "../../config/logger";
import { callLogDto } from "../../interface/callLogDto";

function callMain(req: Request, res: Response) {
    let bodyData: callLogDto = {
        "kakaoId": req.body.kakaoId,
        "state": req.body.state,
        "is_self": req.body.is_self,
        "latitude": req.body.latitude,
        "longitude": req.body.longitude,
    }
    try{
        callService.write_log(bodyData)
        .then(
            ()=>res.status(200).json({ "message": "성공적으로 추가되었습니다." })
        )
    }catch(errMsg){
        res.status(500).json({ "message": errMsg })
    }
    // sendPushMessageGroup("asdf","fdsa","test")
    sendPushMessageIndividual(`${bodyData.state}환자 발생!!`, "$$에 응급상황이 발생하였습니다.", [
        "edJhijkqQ-mEgTt7bONnrh:APA91bGPHLda78vBSVzCqqZTk0ij4iu8x0m4nc27pzRsbF7xzV6LCymFZYOlvezoWbQK_CwmIbwgf_cVI-BHPy5gSq9hesyWe04TbpMUDl7T92k4MA9eaH5fOCNgSuGDMARlfpfXzEnm",
        "f6_TfMnCQUG6ut7sbTLziX:APA91bGgcN1sjZ5WBYgL_67ITKirjoFVYCGwWAI9ZX9eTM0OUF8oZdiKbu1fn9kSEo7NapvwzN407Zz5nsZg-zXEnFjzem4ZZkfnMgOV1LYBy93HNH7NUNXNPCCc2ao3P4u--0yp8RGB"
    ])
}

export {
    callMain,
}