import { Request, Response, NextFunction } from 'express'
import { write_log, search_schedule } from "../../service/emergency/callService";
import { find_hospital, find_publicInstitutions, find_userLocation } from "../../service/apis/findLocation";
import { sendPushMessageIndividual } from "../../middleware/sendPushMessage";
import { callLogDto } from "../../interface/callLogDto";

async function callMain(req: Request, res: Response) {
    try {
        let bodyData: callLogDto = {
            "kakaoId": req.body.kakaoId,
            "state": req.body.state,
            "is_self": req.body.is_self,
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
        }
        await write_log(bodyData)       //로그 저장
        let userLocation: any = await find_userLocation(bodyData);  //환자 위치 정보 확인


        // await find_hospital(bodyData)   //병원 찾기
        // .then(
        //     (result:any)=>{
        //         // console.log(result)
        //         res.status(200).json({ 
        //             "message": "성공하였습니다.",
        //             "result": result
        //          })
        //     }
        // )

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
        
        await sendPushMessageIndividual(`${bodyData.state}환자 발생!!`, `${userLocation.documents[0].address.address_name}에 응급상황이 발생하였습니다.`, await search_schedule(fireStationId))  //푸시메시지 전송
        // await sendPushMessageIndividual(`${bodyData.state}환자 발생!!`, `${userLocation.documents[0].address.address_name}에 응급상황이 발생하였습니다.`, [
        //     "edJhijkqQ-mEgTt7bONnrh:APA91bGPHLda78vBSVzCqqZTk0ij4iu8x0m4nc27pzRsbF7xzV6LCymFZYOlvezoWbQK_CwmIbwgf_cVI-BHPy5gSq9hesyWe04TbpMUDl7T92k4MA9eaH5fOCNgSuGDMARlfpfXzEnm",
        //     "f6_TfMnCQUG6ut7sbTLziX:APA91bGgcN1sjZ5WBYgL_67ITKirjoFVYCGwWAI9ZX9eTM0OUF8oZdiKbu1fn9kSEo7NapvwzN407Zz5nsZg-zXEnFjzem4ZZkfnMgOV1LYBy93HNH7NUNXNPCCc2ao3P4u--0yp8RGB"
        // ])  //푸시메시지 전송

        res.status(200).json({
            "message": "성공하였습니다.",
            "result": fireStationId
        })
    } catch (errMsg) {
        res.status(202).json({ "message": errMsg })
    }
}

export {
    callMain,
}