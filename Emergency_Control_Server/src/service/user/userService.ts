import { callLogRepo } from "../../model/repository/emergency/callLogRepo";
import { emergencyManRepo } from "../../model/repository/firestation/emergencyManRepo";
import { emergencyManDto } from "../../interface/emergencyManDto";
import { userDoorDto } from "../../interface/userDoorDto";
import { logger } from "../../config/logger";
import requestModule from "../../middleware/request"

//Log read
async function check_log(scheduleIds : Array<number>) {
    try {
        const bgr = new callLogRepo;
        return await bgr.checkLogOne_scheduleId(scheduleIds)
        // return 1; //로그 저장 성공
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts(EM Man) - check_log]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

//create user(EM_MAN)
async function createUser(bodyData : emergencyManDto) {
    try {
        const emr = new emergencyManRepo;
        return await emr.createEmergencyMan(bodyData)
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts(EM Man) - createUser]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

//find user(EM_MAN)
async function findUser(bodyData : emergencyManDto) {
    try {
        const emr = new emergencyManRepo;
        let result: any = await emr.findUserFlag(bodyData.kakaoId);
        if(result.length) return result;                //결과값이 있다면 결과 제출
        else throw `해당하는 유저${bodyData.kakaoId}가 존재하지 않습니다.`;    // 없다면 에러 발생
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts(EM Man) - findUser]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

//이미지 수정하기! (EM_MAN)
async function changeUserImage(bodyData : emergencyManDto) {
    try {
        const emr = new emergencyManRepo;
        return await emr.updateUserImage(bodyData) //flag로 찾기
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts(EM Man) - changeUserImage]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

// UUID, TOKEN 수정하기! (EM_MAN)
async function restoreUser(bodyData : emergencyManDto) {
    try {
        const emr = new emergencyManRepo;
        return await emr.restoreUserUuidToken(bodyData)
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts(EM Man) - restoreUser]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

// FireStation ID 변경 
async function changeFireStationId(bodyData : emergencyManDto) {
    try {
        const emr = new emergencyManRepo;
        return await emr.modifyFID(bodyData)
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts(EM Man) - changeFireStationId]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

// UUID, TOKEN 수정하기! (EM_MAN)
async function addDoorUuid(bodyData : userDoorDto) {
    try {
        let parseUrl = `http://localhost:43042/user/add/door`
        return requestModule(parseUrl, 'POST', 'etc', bodyData)
    } catch (errMsg) {
        logger.error({
            label: "[userService.ts(EM Man) - addDoorUuid]",
            message: `\n\t└ err : ${errMsg}`
        })
        throw errMsg;
    }
}

export {
    check_log,
    createUser,
    findUser,
    changeUserImage,
    restoreUser,
    changeFireStationId,
    addDoorUuid
}