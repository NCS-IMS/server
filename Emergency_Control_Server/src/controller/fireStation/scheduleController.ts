import { Request, Response, NextFunction } from 'express'
import { add_schedule, select_schedule} from "../../service/firestation/manageScheduleService";
import { check_log, createUser, findUser, changeUserImage, restoreUser } from "../../service/user/userService";
import { find_publicInstitutions } from "../../service/apis/findLocation";
import { manageScheduleDto } from "../../interface/manageScheduleDto";
import { emergencyManDto } from "../../interface/emergencyManDto";
import { callLogDto } from "../../interface/callLogDto";

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
        "gender": req.body.gender,
        "email": req.body.email,
        "phone": req.body.mobile,
        "birth": req.body.birth,
        "token": req.body.token,
        "mac": req.body.mac,
        "flag": 0,
        "fireStationId": req.body.firestationId,
        "uuid": req.body.uuid
    }
    if(files.profile_image!=undefined) bodyData.imgSrc= files.profile_image[0].originalname   //img Check..
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

async function modifyImageEmMan(req: Request, res: Response) {
    let bodyData: emergencyManDto = {
        "kakaoId": req.body.id
    }
    let files : any = req.files;

    try{
        // 이미지 확인을 먼저.
        if(files.profile_image!=undefined) bodyData.imgSrc= files.profile_image[0].originalname;   //img Check..
        else throw "이미지가 변경되지 않았습니다.";

        await findUser(bodyData)            // 유저를 확인한다
        await changeUserImage(bodyData)     // 이미지 추가..!
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

async function modifyRestoreEmMan(req: Request, res: Response) {
    let bodyData: emergencyManDto = {
        "kakaoId": req.body.id,
        "uuid": req.body.uuid,
        "token": req.body.token
    }

    try{
        console.log(bodyData)
        await findUser(bodyData)            // 유저를 확인한다
        await restoreUser(bodyData)         // UUID, TOKEN 수정!
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


async function findFirestation(req: Request, res: Response) {
    let bodyData: any = {
        longitude : req.body.x,
        latitude: req.body.y,
    };
    try{
        //'공공기관' 안에서 소방서 찾기
        let pageCount = 1;      // API 상으로 체크할 Page Number
        let fireStations: Array<object> = [];

        while (pageCount<5) {  // 최대 5페이지까지 찾기 
            let resultData: any = await find_publicInstitutions(bodyData, pageCount)    //API찾기
            // console.log(resultData)
            for (let key in resultData.documents) { //찾은 Data 안에서 소방서 값 찾기
                let tmp = resultData.documents[key].category_name.split(' > ')[2];
                if (tmp == "소방서") {  //있는경우 ARRAY에 PUSH함.
                    fireStations.push(resultData.documents[key])    //ID값 추출
                    break;  //For문 탈출
                }
            }
            pageCount++;
        }
        res.status(200).json( {
            "message": "성공하였습니다.",
            "result": fireStations
        })
    }catch(errMsg: any){
        res.status(202).json( {"message": errMsg } )
    }
}




export {
    addSchedule,
    findSchedule,
    findLogs,
    createEmMan,
    modifyImageEmMan,
    modifyRestoreEmMan,
    findFirestation
}