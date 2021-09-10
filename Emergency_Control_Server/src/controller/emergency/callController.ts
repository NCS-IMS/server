import { Request, Response, NextFunction } from 'express'
import { write_log, search_schedule } from "../../service/emergency/callService";
import { find_emergencyRoom, find_publicInstitutions, find_userLocation } from "../../service/apis/findLocation";
import { sendPushMessageIndividual } from "../../middleware/sendPushMessage";
import { callLogDto } from "../../interface/callLogDto";
import { userDoorDto } from "../../interface/userDoorDto";

async function callMain(req: Request, res: Response) {
    try {
        const bodyData: callLogDto = {
            "kakaoId": req.body.kakaoId,
            "state": req.body.state,
            "isSelf": req.body.is_self,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "userAddr": req.body.user_addr,
            "anamnesis": req.body.anamnesis,
            "medicine": req.body.medicine,
            "door": {"id": req.body.doorId}
        }

        let userLocation: any = await find_userLocation(bodyData);  //환자 위치 정보 확인
       
        //'공공기관' 안에서 소방서 찾기
        let pageCount = 1;      // API 상으로 체크할 Page Number
        let fireStationFlag : boolean = false;  //소방서 존재 여부를 체크하기 위한 Flag
        let fireStationId: string = '';

        while (pageCount<10) {  // 최대 10페이지까지 찾기 
            let resultData: any = await find_publicInstitutions(bodyData, pageCount)    //API찾기
            // console.log(resultData)
            for (let key in resultData.documents) { //찾은 Data 안에서 소방서 값 찾기
                let tmp = resultData.documents[key].category_name.split(' > ')[2];
                if (tmp == "소방서") {  //있는경우 ARRAY에 PUSH함.
                    fireStationFlag=true;   //반복문 탈출을 위한 true 처리
                    fireStationId = resultData.documents[key].id    //ID값 추출
                    break;  //For문 탈출
                }
            }
            if (!fireStationFlag) pageCount++;    //못 찾은경우 ++
            else break; //찾은경우 while문 탈출
        }

        //door 처리를 위한 포매팅
        let doorData: userDoorDto;
        // Door 에 UUID 등록
        if(req.body.doorId != "" && req.body.doorId != undefined) {
            doorData = {
                "kakaoId": req.body.kakaoId,
                "doorId": req.body.doorId
            }
            
        }else{
            doorData = {
                "doorId": 0
            }
        }

        let schedule_data : any = await search_schedule(fireStationId, doorData)    //Token 찾기
       
        sendPushMessageIndividual(
            `${bodyData.state}환자 발생!!`,
            `${userLocation.documents[0].address.address_name}에 응급상황이 발생하였습니다.`,
            await schedule_data.tokens
        )  //푸시메시지 전송

        bodyData.em_schedule = {"id": schedule_data.eid};
        
        //있다면 넣기
        if(req.body.medicine != undefined) bodyData.medicine = req.body.medicine
        if(req.body.anamnesis != undefined) bodyData.anamnesis = req.body.anamnesis
        if(req.body.user_addr != undefined) bodyData.userAddr = req.body.user_addr
        bodyData.emAddr = userLocation.documents[0].address.address_name
        await write_log(bodyData)       //로그 저장
        await find_emergencyRoom(bodyData)   //병원 찾기
        .then(
            (result:any)=>{
                // console.log(result)
                res.status(200).json({ 
                    "message": "성공하였습니다.",
                    "result": result.documents[0]   //이후에 응급구조사님들께 병원 위치 보내야하는데... 일단 대기
                })
            }
        )
        // res.status(200).json({
        //     "message": "성공하였습니다.",
        // })
    } catch (errMsg) {
        res.status(202).json({ "message": errMsg })
    }
}
export {
    callMain
}