import { Request, Response, NextFunction } from 'express'
import { find_hospital, find_pharmacy } from "../../service/apis/findLocation";
// import { find_emergencyRoom, find_publicInstitutions, find_userLocation } from "../../service/apis/findLocation";
// import { sendPushMessageIndividual } from "../../middleware/sendPushMessage";
import { findDirectionDto } from "../../interface/findDirectionDto";

async function findMain(req: Request, res: Response) {
    try {
        let bodyData: findDirectionDto = {
            "latitude": req.body.latitude,
            "longitude": req.body.longitude,
            "option": req.body.option,
        }
        let urlQuery :string = req.url.split('/')[1];
        if(urlQuery == 'hospital'){ //병원?
            await find_hospital(bodyData)
            .then(
                (result:any)=>{
                    let resultData: any = [];
                    if(bodyData.option!=undefined){ //option 있는 경우
                        for(var key in result.documents){
                            if(result.documents[key].category_name.split(' > ')[2] == bodyData.option)
                            resultData.push(result.documents[key])
                        }
                        res.status(200).json({ "message": resultData })
                    }else{  //option 없는 경우
                        res.status(200).json({ "message": result.documents })
                    }
                    
                }
            )
        }else if(urlQuery == 'pharmacy'){  //약국?
            await find_pharmacy(bodyData)
            .then(
                (result:any)=>res.status(200).json({ "message": result.documents })
            )
        }else{
            throw "존재하지 않는 URL입니다"
        }
        
    } catch (errMsg) {
        res.status(202).json({ "message": errMsg })
    }
}
export {
    findMain
}