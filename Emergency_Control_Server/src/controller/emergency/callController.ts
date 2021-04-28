import {Request, Response, NextFunction} from 'express'
import * as callService from "../../service/emergency/callService";
import { logger } from "../../config/logger";
import { callLogDto } from "../../interface/callLogDto";

function callMain(req:Request, res:Response){
    let bodyData : callLogDto ={
        "kakaoId": req.body.kakaoId,
        "state": req.body.state,
        "is_self": req.body.is_self,
        "latitude": req.body.latitude,
        "longitude": req.body.longitude,
    }
    callService.write_log(bodyData)
        .then(
            (result: number)=>{
                if(result) res.status(200).json({"message":"성공적으로 추가되었습니다."})
                else res.status(500).json({"message":"Database Insert ERR."})
            }
        )//end then
        .catch(
            (err: any)=>{
                logger.error({
                    label:"[callController.ts - callMain]",
                    message: `\n\t└ input data(form) : ${bodyData} \n\t└ err : ${err} `
                })
                res.json({"message" : "알 수 없는 오류가 발생하였습니다!"})
            }
        )//end catch
}

export{
    callMain,
}