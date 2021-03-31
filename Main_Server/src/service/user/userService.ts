import { userRepo } from "../../model/repository/user/userRepo";
import { userDto } from "../../interface/userDto";
import { logger } from "../../config/logger";

//USER CREATE
async function create_user(bodyData:userDto){
  const bgr = new userRepo;
  console.log(bodyData)
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
  // console.log(timber.user.email)
}
export {
  create_user
}