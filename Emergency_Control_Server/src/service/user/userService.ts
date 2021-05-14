import { callLogRepo } from "../../model/repository/emergency/callLogRepo";
import { emergencyManRepo } from "../../model/repository/firestation/emergencyManRepo";
import { emergencyManDto } from "../../interface/emergencyManDto";
import { logger } from "../../config/logger";

//Log read
async function check_log(scheduleIds : Array<number>) {
    try {
        const bgr = new callLogRepo;
        return await bgr.checkLogOne_scheduleId(scheduleIds)
        // return 1; //로그 저장 성공
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts - check_log]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

//create user
async function createUser(bodyData : emergencyManDto) {
    try {
        const emr = new emergencyManRepo;
        return await emr.createEmergencyMan(bodyData)
        // return 1; //로그 저장 성공
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts - createUser]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}
export {
    check_log,
    createUser
}