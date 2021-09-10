import { find_uuid } from "../emergency/callService";
import { manageScheduleRepo } from "../../model/repository/firestation/manageScheduleRepo";
import { emergencyManRepo } from "../../model/repository/firestation/emergencyManRepo";
import { logRepo } from "../../model/repository/logRepo";
import { emScheduleRepo } from "../../model/repository/firestation/emScheduleRepo";
import { manageScheduleDto } from "../../interface/manageScheduleDto";
import { logger } from "../../config/logger";
import { setFlagsFromString } from "v8";
import { restoreUser } from "../user/userService";

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

async function create_schedule(data: object) {
  try {
    const esr = new emScheduleRepo;
    await esr.createSchedule(data)  //EMM이 있는지 확인
    return 1;
  
  }catch (errMsg){

    logger.error({
      label: "[manageScheduleService.ts - create_schedule]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;

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
    let result:any = await msr.findManageSchedule_KakaoId(bodyData);
    
    if(await result[0]!=undefined) return result[0].em_schedule   //schedule에서 id에 해당하는 값 추출
    else throw `${bodyData.kakaoId}님은 ${bodyData.startDate}에 스케쥴이 존재하지 않습니다!`
  
  }catch (errMsg){

    logger.error({
      label: "[manageScheduleService.ts - add_schedule]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;

  }
}

//스케쥴 확인
async function select_scheduleByCarNum(carNum: string) {
  try {
    const esr = new emScheduleRepo;
    const result = await esr.findScheduleId_carNum(carNum)  //EMM이 있는지 확인
      .then((result: any) => {
        if (!result[0]) { //응급구조사를 찾을 수 없는 경우
          throw `input data(carnum) : (${carNum})`
         }
         return result[0];
      })
      return await find_uuid(Number(result.id));
  
  }catch (errMsg){

    logger.error({
      label: "[manageScheduleService.ts - select_scheduleByCarNum]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;

  }
}

//스케쥴 확인
async function select_schedule_all(inter:number, ski:number, flag: number) {
  try {
    const lr = new logRepo;
    return await lr.findLogAll(inter, ski, flag)  //EMM이 있는지 확인
      .then((result: any) => {
        if (!result[0]) { //응급구조사를 찾을 수 없는 경우
          throw `표시할 로그가 없습니다.`
         }
         return result;
      })
  }catch (errMsg){
    logger.error({
      label: "[manageScheduleService.ts - add_schedule]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

//스케쥴 확인
async function select_schedule_date(startDate: string) {
  try {
    const msr = new manageScheduleRepo;
    if(startDate === '') {
      return await msr.findAll();
    } else{ 
      return await msr.findSchedule(startDate)  //schedule이 있는지 확인
      .then((result: any) => {
        if (!result[0]) { //스케쥴을 찾을 수 없는 경우
          throw `값이 없음.`
         }
         return result;
      })
    }
  
  }catch (errMsg){

    logger.error({
      label: "[manageScheduleService.ts - select_schedule_date]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;

  }
}

export {
  add_schedule,
  select_schedule,
  select_schedule_all,
  select_scheduleByCarNum,
  create_schedule,
  select_schedule_date
}