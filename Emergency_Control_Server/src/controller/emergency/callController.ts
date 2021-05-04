import { Request, Response, NextFunction } from 'express'
import { write_log } from "../../service/emergency/callService";
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
        let userLocation: any = await find_userLocation(bodyData);
        await sendPushMessageIndividual(`${bodyData.state}환자 발생!!`, `${userLocation.documents[0].address.address_name}에 응급상황이 발생하였습니다.`, [
            "edJhijkqQ-mEgTt7bONnrh:APA91bGPHLda78vBSVzCqqZTk0ij4iu8x0m4nc27pzRsbF7xzV6LCymFZYOlvezoWbQK_CwmIbwgf_cVI-BHPy5gSq9hesyWe04TbpMUDl7T92k4MA9eaH5fOCNgSuGDMARlfpfXzEnm",
            "f6_TfMnCQUG6ut7sbTLziX:APA91bGgcN1sjZ5WBYgL_67ITKirjoFVYCGwWAI9ZX9eTM0OUF8oZdiKbu1fn9kSEo7NapvwzN407Zz5nsZg-zXEnFjzem4ZZkfnMgOV1LYBy93HNH7NUNXNPCCc2ao3P4u--0yp8RGB"
        ])  //푸시메시지 전송

        await write_log(bodyData)       //로그 저장
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
        var pageCount = 1;
        let fireStations: Array<object> = [];
        while (pageCount) {
            let resultData: any = await find_publicInstitutions(bodyData, pageCount)
            // console.log(resultData)
            for (let key in resultData.documents) {
                let tmp = resultData.documents[key].category_name.split(' > ')[2];
                // console.log(resultData.documents[key].category_name)
                // console.log(resultData.documents[key].place_name)
                if (tmp == "소방서") {
                    fireStations.push(resultData.documents[key])
                    break;
                }
            }
            if (fireStations.length <= 0) {
                pageCount++;
            } else {
                break;
            }
        }
        res.status(200).json({
            "message": "성공하였습니다.",
            "result": fireStations
        })
        // await find_publicInstitutions(bodyData, 1)


        //test
        // await find_publicInstitutions(bodyData, 1)   //공공기관 찾기
        // .then(
        //     (result:any)=>{
        //         //소방서 데이터만 추출
        //         let resultData = result.documents;
        //         var pageCount = 1;
        //         let fireStations:Array<object> = [];
        //         console.log("FF")
        //         console.log(fireStations==undefined)
        //         console.log(fireStations[0]==undefined)
        //         console.log(fireStations.length<=0)

        //         while(pageCount<5){
        //             for(let key in resultData){
        //                 let tmp = resultData[key].category_name.split(' > ')[2];
        //                 if(tmp == "소방서"){
        //                     fireStations.push(resultData[key])
        //                 }
        //             }
        //             if(fireStations.length<=0){
        //                 pageCount++;
        //                 find_publicInstitutions(bodyData, pageCount)

        //             }
        //         }



        //         // for(let key in resultData){
        //         //     let tmp = resultData[key].category_name.split(' > ')[2];
        //         //     // console.log(resultData[key].category_name.split(' > ')[2])

        //         //     if(tmp == "소방서"){
        //         //         forInCount = 0;
        //         //     }
        //         // }
        //         res.status(200).json({ 
        //             "message": "성공하였습니다.",
        //             "result": result
        //          })
        //     }
        //     //tttteeesssttt
        // )
    } catch (errMsg) {
        res.status(202).json({ "message": errMsg })
    }
}

export {
    callMain,
}