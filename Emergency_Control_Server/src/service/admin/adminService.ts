// import { userRepo } from "../../model/repository/user/userRepo";
// import { userDto } from "../../interface/userDto";
// import { logger } from "../../config/logger";

// //관리자 추가는 Supervisor만 가능함!
// async function create_user(bodyData:userDto){
//   const bgr = new userRepo;
//   try{
//     await bgr.insertUser(bodyData)
//     return "성공적으로 추가되었습니다.";
//   }catch(err){
//     logger.error({
//       label:"[userService.ts - create_user]",
//       message: `\n\t└ err : ${err}`
//     })
//     return `Database Insert ERR.`;
//   }
//   // console.log(timber.user.email)
// }
// export {
//   create_user
// }