import { Request, Response, NextFunction } from 'express'
import * as manageScheduleService from "../../service/firestation/manageScheduleService";
import { sendPushMessageGroup, sendPushMessageIndividual } from "../../middleware/sendPushMessage";
import { manageScheduleDto } from "../../interface/manageScheduleDto";
import { logger } from "../../config/logger";
import { callLogDto } from "../../interface/callLogDto";


async function addSchedule(req: Request, res: Response) {
    // manageScheduleService.select_schedule()
    let bodyData: manageScheduleDto = {
        "kakaoId": req.body.kakaoId,
        "scheduleId": req.body.scheduleId
    }
    try{
        await manageScheduleService.add_schedule(bodyData)
        .then(
            ()=>res.json({ "message": "성공적으로 생성되었습니다." })
        )
    }catch(errMsg){
        res.json({ "message": errMsg })
    }
    // manageScheduleService.add_schedule(bodyData)
    //     .then(
    //         (result: any) => {
    //             let returnString: string = '';
    //             switch(result){
    //                 case 1: //참
    //                     returnString = "성공적으로 생성되었습니다."
    //                     break;
    //                 case 0: //DB ERR
    //                     returnString = "Database Create ERR."
    //                     break;
    //                 case -1: //No Emergency Man
    //                     returnString = "해당하는 응급구조사가 존재하지 않습니다."
    //                     break;
    //                 case -2: //No Schedule
    //                     returnString = "해당하는 스케쥴이 존재하지 않습니다."
    //                     break;
    //                 case -3: //No Schedule
    //                     returnString = "해당 데이터는 이미 존재합니다."
    //                     break;
    //             }
    //             res.json({ "message": returnString })
    //             // res.json({"message":returnString})
    //         }
    //     )//end then
    //     .catch(
    //         (err: any) => {
    //             logger.error({
    //                 label: "[userController.ts - create_user]",
    //                 // message: `\n\t└ input data(form) : ${bodyData} \n\t└ err : ${err} `
    //             })
    //             res.json({ "message": "알 수 없는 오류가 발생하였습니다!" })
    //         }
    //     )//end catch






    // let bodyData: callLogDto = {
    //     "kakaoId": req.body.kakaoId,
    //     "state": req.body.state,
    //     "is_self": req.body.is_self,
    //     "latitude": req.body.latitude,
    //     "longitude": req.body.longitude,
    // }

    // // sendPushMessageGroup("asdf","fdsa","test")
    // sendPushMessageIndividual("응급상황 발생!!", "$$에 응급상황이 발생하였습니다.", [
    //     "edJhijkqQ-mEgTt7bONnrh:APA91bGPHLda78vBSVzCqqZTk0ij4iu8x0m4nc27pzRsbF7xzV6LCymFZYOlvezoWbQK_CwmIbwgf_cVI-BHPy5gSq9hesyWe04TbpMUDl7T92k4MA9eaH5fOCNgSuGDMARlfpfXzEnm",
    //     "f6_TfMnCQUG6ut7sbTLziX:APA91bGgcN1sjZ5WBYgL_67ITKirjoFVYCGwWAI9ZX9eTM0OUF8oZdiKbu1fn9kSEo7NapvwzN407Zz5nsZg-zXEnFjzem4ZZkfnMgOV1LYBy93HNH7NUNXNPCCc2ao3P4u--0yp8RGB"
    // ])

    // callService.write_log(bodyData)
    //     .then(
    //         (result: number) => {
    //             if (result) res.status(200).json({ "message": "성공적으로 추가되었습니다." })
    //             else res.status(500).json({ "message": "Database Insert ERR." })
    //         }
    //     )//end then
    //     .catch(
    //         (err: any) => {
    //             logger.error({
    //                 label: "[callController.ts - callMain]",
    //                 message: `\n\t└ input data(form) : ${bodyData} \n\t└ err : ${err} `
    //             })
    //             res.json({ "message": "알 수 없는 오류가 발생하였습니다!" })
    //         }
    //     )//end catch
}
async function findSchedule(req: Request, res: Response) {
    let bodyData: manageScheduleDto = {
        "kakaoId": req.body.kakaoId,
        "scheduleId": 0
    }
    try{
        await manageScheduleService.select_schedule(bodyData)
        .then(
            (result: any)=>res.json( {
                "message": "성공하였습니다.",
                "result": result[0].em_schedule
            } )
        )
    }catch(errMsg){
        res.json( {"message": errMsg } )
    }
}
export {
    addSchedule,
    findSchedule
}