import { callLogRepo } from "../../model/repository/emergency/callLogRepo";
import { callLogDto } from "../../interface/callLogDto";
import { logger } from "../../config/logger";

//Log read
async function check_log(scheduleIds : Array<number>) {
    try {
        console.log(scheduleIds)
        const bgr = new callLogRepo;
        console.log(await bgr.checkLog_scheduleId(scheduleIds))
        // return 1; //로그 저장 성공



    } catch (errMsg) {
        logger.error({
            label: "[userService.ts - check_log]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

export {
    check_log
}