import { Request, Response, NextFunction } from 'express'
import { add_schedule, select_schedule} from "../../service/firestation/manageScheduleService";
import { check_log, createUser } from "../../service/user/userService";
import { manageScheduleDto } from "../../interface/manageScheduleDto";
import { emergencyManDto } from "../../interface/emergencyManDto";

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
        "startDate": req.body.startDate,
        "scheduleId": 0
    }
    try{
        await select_schedule(bodyData)
        .then(
            (result: any)=>{
                res.status(200).json( {
                    "message": "성공하였습니다.",
                    "result": result
                } )
            }
        )
    }catch(errMsg: any){
        res.status(202).json( {"message": errMsg } )
    }
}

async function findLogs(req: Request, res: Response) {
    let bodyData: manageScheduleDto = {
        "kakaoId": req.body.kakaoId,
        "startDate": req.body.startDate,
        "scheduleId": 0
    }
    try{
        await select_schedule(bodyData)
        .then(
            async (result: any)=>{
                // console.log(result.em_schedule);
                let scheduleIds : Array<number> = [];
                for(let key in result){
                    scheduleIds.push(result[key].id)
                }
                res.status(200).json( {
                    "message": "성공하였습니다.",
                    "result": await check_log(scheduleIds)
                })
            }
        )
    }catch(errMsg: any){
        res.status(202).json( {"message": errMsg } )
    }
}

async function createEmMan(req: Request, res: Response) {
    let files : any = req.files;
    let bodyData: emergencyManDto = {
        "kakaoId": req.body.id,
        "name": req.body.name,
        // "imgSrc": req.body.profile_image,
        "gender": req.body.gender,
        "email": req.body.email,
        "phone": req.body.mobile,
        "birth": req.body.birth,
        "token": req.body.token,
        "mac": req.body.mac,
        "flag": 0,
        "fireStationId": req.body.firestationId
    }
    if(files.imgSrc!=undefined) bodyData.imgSrc= files.imgSrc[0].originalname   //img Check..
    try{
        await createUser(bodyData)
        .then(
            ()=>{
                res.status(200).json( {
                    "message": "성공하였습니다."
                })
            }
        )
    }catch(errMsg: any){
        res.status(202).json( {"message": errMsg } )
    }
}

export {
    addSchedule,
    findSchedule,
    findLogs,
    createEmMan
}