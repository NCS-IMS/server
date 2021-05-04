import { Request, Response, NextFunction } from 'express'
import { add_schedule, select_schedule} from "../../service/firestation/manageScheduleService";
import { manageScheduleDto } from "../../interface/manageScheduleDto";

async function addSchedule(req: Request, res: Response) {
    // manageScheduleService.select_schedule()
    let bodyData: manageScheduleDto = {
        "kakaoId": req.body.kakaoId,
        "scheduleId": req.body.scheduleId
    }
    try{
        await add_schedule(bodyData)
        .then(
            ()=>res.status(200).json({ "message": "성공적으로 생성되었습니다." })
        )
    }catch(errMsg){
        res.status(202).json({ "message": errMsg })
    }
}

async function findSchedule(req: Request, res: Response) {
    let bodyData: manageScheduleDto = {
        "kakaoId": req.body.kakaoId,
        "scheduleId": 0
    }
    try{
        await select_schedule(bodyData)
        .then(
            (result: any)=>res.status(200).json( {
                "message": "성공하였습니다.",
                "result": result[0].em_schedule
            } )
        )
    }catch(errMsg: any){
        res.status(202).json( {"message": errMsg } )
    }
}
export {
    addSchedule,
    findSchedule
}