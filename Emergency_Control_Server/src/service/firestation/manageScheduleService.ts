import { manageScheduleRepo } from "../../model/repository/firestation/manageScheduleRepo";
// import { callLogDto } from "../../interface/callLogDto";
import { logger } from "../../config/logger";

//USER CREATE
async function add_schedule(){
  const msr = new manageScheduleRepo;
  try{
    await msr.addSchedule()
    return 1; //로그 저장 성공
  }catch(err){
    logger.error({
      label:"[callService.ts - write_log]",
      message: `\n\t└ err : ${err}`
    })
    return 0; //로그 저장 실패
  }
}
export {
  add_schedule
}