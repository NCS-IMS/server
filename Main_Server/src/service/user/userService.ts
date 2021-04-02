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
    return  await bgr.findAllUser()
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
    return await bgr.findOneUser(kakaoId)
  }catch(err){
    logger.error({
      label:"[userService.ts - find_user_detail]",
      message: `\n\t└ err : ${err}`
    })
    return `Database Select ERR.`;
  }
}

export {
  create_user,
  find_user,
  find_user_detail
}