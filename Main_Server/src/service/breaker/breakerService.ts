/**
 * @author 김득회
 * @see 김영재
 * @version 1.0.0
 * @since 2021-08-11
 */

import { logger } from "../../config/logger";
import { breakerRepo } from "../../model/repository/door/breakerRepo";

async function checkCarNumber(id:any) {
    const br = new breakerRepo;

    try{
        var result = await br.checkBreakerCarNum(id);
        if(result != undefined){
            return result;
        }else{
            throw "해당 차 번호가 존재하지 않습니다."
        }
    }catch(errMsg){
        logger.error({
            label: "[breakerService.ts - checkCarNumber]",
            message: `\n\t └ err : ${errMsg}`
        })
        throw errMsg
    }
}

export {
    checkCarNumber
}