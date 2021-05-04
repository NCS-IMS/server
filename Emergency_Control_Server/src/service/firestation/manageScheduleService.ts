import { manageScheduleRepo } from "../../model/repository/firestation/manageScheduleRepo";
import { emergencyManRepo } from "../../model/repository/firestation/emergencyManRepo";
import { emScheduleRepo } from "../../model/repository/firestation/emScheduleRepo";
import { manageScheduleDto } from "../../interface/manageScheduleDto";
import { logger } from "../../config/logger";

//Schedule Create (Many to Many)
async function add_schedule(bodyData: manageScheduleDto) {
  try {
    const msr = new manageScheduleRepo;
    await msr.findManageScheduleAll(bodyData)   //데이터가 원래 존재했는지 확인
      .then((result: any) => { 
        if (result[0]) {  //데이터가 이미 존재하는 경우
          throw `해당 데이터는 이미 존재합니다.(${bodyData.scheduleId},${bodyData.kakaoId})`
        }
      })

    const esr = new emScheduleRepo;
    await esr.findSchedule_scheduleId(bodyData.scheduleId)  //schedule이 있는지 확인
      .then((result: any) => {
        if (!result[0]) { //스케쥴을 찾을 수 없는 경우
          throw `(${bodyData.scheduleId}) 값을 넣어 스케쥴을 찾을 수 없었습니다.`
         }
      })

    let result: any = await select_schedule(bodyData)      //schedule에서 id에 해당하는 값 추출
    await msr.addSchedule(result[0].em_schedule, bodyData)  //추출된 값의 em_schedule을 넣음
    // console.log(result[0].em_schedule)

    return 1; //스케쥴 저장 성공

  } catch (errMsg: any) {
    logger.error({
      label: "[manageScheduleService.ts - add_schedule]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
    // return 0; //스케쥴 저장 실패
  }
}

//스케쥴 확인
async function select_schedule(bodyData: manageScheduleDto) {
  try {

    const emr = new emergencyManRepo;
    await emr.findEmergencyMan(bodyData.kakaoId)  //EMM이 있는지 확인
      .then((result: any) => {
        if (!result[0]) { //응급구조사를 찾을 수 없는 경우
          throw `(${bodyData.kakaoId}) 값을 넣어 응급구조사를 찾을 수 없었습니다.`
         }
      })

    const msr = new manageScheduleRepo;
    return msr.findManageSchedule_KakaoId(bodyData.kakaoId)   //schedule에서 id에 해당하는 값 추출
  
  }catch (errMsg){

    logger.error({
      label: "[manageScheduleService.ts - add_schedule]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;

  }
}

export {
  add_schedule,
  select_schedule
}