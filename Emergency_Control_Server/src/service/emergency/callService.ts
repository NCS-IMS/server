import { CallLogRepo } from "../../model/repository/emergency/CallLogRepo";
import { callLogDto } from "../../interface/callLogDto";
import { logger } from "../../config/logger";

//USER CREATE
async function write_log(bodyData:callLogDto){
  const bgr = new CallLogRepo;
  try{
    await bgr.insertLog(bodyData)
    return bodyData; //로그 저장 성공
  }catch(err){
    logger.error({
      label:"[callService.ts - write_log]",
      message: `\n\t└ err : ${err}`
    })
    return 0; //로그 저장 실패
  }
}
export {
  write_log
}