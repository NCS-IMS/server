/**
 * @author 김득회
 * @see 김영재
 * @version 1.0.0
 * @since 2021-08-11
 */

 /**
  * 자동차 번호판이 출동한 소방관의 번호판인지 확인하는 기능을 하는 controller
  * 라즈베리파이로 구현된 차단기 OCR 번호판 인식기가 서버로부터 요청을 하면 번호를 탐색한다.
  * 포스트맨에 등록 : YES
  */

import { Request, Response, NextFunction } from 'express'
import {checkCarNumber} from "../../service/breaker/breakerService";
import requestModule from "../../middleware/request"


async function searchCarNumber(req: Request, res: Response) {
    try{
        var id = req.query.id;
        var carNum = req.query.carNum;

        var carNumArr = checkCarNumber(id)
        .then(
            async (result: any)=>{
                var json = JSON.stringify(result[0]);
                var obj = JSON.parse(json);
                var carNumArr = obj.car_num.split(",");
                //res.send(carNumArr.includes(carNum))
                let parseUrl = `http://conative.myds.me:43043/schedule/find/carNum`
                const reqs = await requestModule(parseUrl, 'POST', 'myserver', {"carNum":carNum})
            
                res.json({"result" : carNumArr.includes(carNum), "emMan": reqs});
                
            }
        )
        .then(
            () => {
            }
        )
    }catch(errMsg){
        res.status(202).json({"message": errMsg})
    }
}

export{
    searchCarNumber
}