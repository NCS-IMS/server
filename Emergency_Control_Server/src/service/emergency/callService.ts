import { callLogRepo } from "../../model/repository/emergency/callLogRepo";
import { callLogDto } from "../../interface/callLogDto";
import { logger } from "../../config/logger";

//USER CREATE
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
export {
  write_log
}