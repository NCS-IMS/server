import { userRepo } from "../../model/repository/user/userRepo";
import { userDto } from "../../interface/userDto";
import { logger } from "../../config/logger";

//USER CREATE
async function create_user(bodyData:userDto){
  const bgr = new userRepo;
  try{
    await bgr.insertUser(bodyData)
    return "성공적으로 추가되었습니다.";
  }catch(err){
    logger.error({
      label:"[userService.ts - create_user]",
      message: `\n\t└ err : ${err}`
    })
    return `Database Insert ERR.`;
  }
}

//USER Find All
async function find_user(){
  const bgr = new userRepo;
  try{
    return await bgr.findAllUser()
  }catch(err){
    logger.error({
      label:"[userService.ts - find_user]",
      message: `\n\t└ err : ${err}`
    })
    return `Database Select ERR.`;
  }
}

//USER Find Detail
async function find_user_detail(kakaoId : string){
  const bgr = new userRepo;
  try{
    let searchFlag = await bgr.findUserFlag(kakaoId)
    
    //존재하지 않는 경우, 회원 자체가 없는 경우
    if(searchFlag[0] == undefined) return "해당하는 유저가 존재하지 않습니다."

    //0일 경우가 일반 회원, 그 외에는 특수한 경우
    else if(!searchFlag[0].flag) return await bgr.findOneUser(kakaoId)

    else return "해당 유저는 휴면상태입니다."
  }catch(err){
    logger.error({
      label:"[userService.ts - find_user_detail]",
      message: `\n\t└ err : ${err}`
    })
    return `Database Select Detail ERR.`;
  }
}

//USER Update
async function update_user(bodyData:userDto){
  const bgr = new userRepo;
  try{
     if(await bgr.findOneUser(bodyData.kakaoId) != undefined){
        await bgr.insertUser(bodyData)
        return bodyData.name;
     } 
     return 0;
  }catch(err){
    logger.error({
      label:"[userService.ts - update_user]",
      message: `\n\t└ err : ${err}`
    })
    return `Database Update ERR.`;
  }
}
export {
  create_user,
  find_user,
  find_user_detail,
  update_user
}