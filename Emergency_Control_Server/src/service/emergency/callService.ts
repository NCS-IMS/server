import { callLogRepo } from "../../model/repository/emergency/callLogRepo";
import { emScheduleRepo } from "../../model/repository/firestation/emScheduleRepo";
import { manageScheduleRepo } from "../../model/repository/firestation/manageScheduleRepo";
import { callLogDto } from "../../interface/callLogDto";
import { userDoorDto } from "../../interface/userDoorDto";
import { addDoorUuid } from "../../service/user/userService";

import { logger } from "../../config/logger";
//Log Create
async function write_log(bodyData:callLogDto){
  try{
    const bgr = new callLogRepo;
    await bgr.insertLog(bodyData)
    return 1; //로그 저장 성공
  }catch(errMsg){
    logger.error({
      label:"[callService.ts - write_log]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

//스케쥴 확인
async function search_schedule(fireStationId: string, doorData: userDoorDto){
  try{
    const esr = new emScheduleRepo;
    let result = await esr.findScheduleDate_fireStationId(fireStationId);
    //필요 시 정/부에 따라 다음 응급대기조가 가게끔 하는 코드 추가

    //데이터가 없을 때
    if(!result.length) throw "데이터가 존재하지 않습니다."

    //현재는 첫 번째것 넣기
    const msr = new manageScheduleRepo;
    //스케쥴 ID에 배정되어있는 Emergency Man 찾기
    let emergency_mans : any = await msr.findManageSchedule_scheduleId(await result[0].id);

    let tokens : Array<object> = [];
    let uuids : string = "";
    for(let key in emergency_mans){
      tokens.push(emergency_mans[key].token)
      uuids+=`${emergency_mans[key].uuid},`
    }
    
    let resultData : object ={
      eid:result[0].id,
      tokens:tokens
    };
    
    // 존재할때만 실행하도록..
    if(doorData.doorId!=0){
      await addDoorUuid({
        uuid: uuids,
        doorId: doorData.doorId
      });  //door 추가 요청
    }

    return resultData; //토큰 배출

  }catch(errMsg){
    logger.error({
      label:"[callService.ts - search_schedule]",
      message: `\n\t└ input data(form) : ${fireStationId} \n\t└ err : ${errMsg} `
    })
    throw errMsg;
  }
}
export {
  write_log,
  search_schedule
}