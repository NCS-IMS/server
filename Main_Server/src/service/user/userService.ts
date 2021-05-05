import { userRepo } from "../../model/repository/user/userRepo";
import { userDto } from "../../interface/userDto";
import { logger } from "../../config/logger";

//USER CREATE
async function create_user(bodyData: userDto) {
  const bgr = new userRepo;
  try {
    if (await bgr.findOneUser(bodyData.kakaoId) != undefined) return "회원가입된 ID가 이미 존재합니다"
    await bgr.insertUser(bodyData)
    return "성공적으로 추가되었습니다.";
  } catch (errMsg) {
    logger.error({
      label: "[userService.ts - create_user]",
      message: `\n\t└ input data(form) : ${bodyData} \n\t└ err : ${errMsg} `
    })
    throw errMsg;
  }
}

//USER Find All
async function find_user() {
  const bgr = new userRepo;
  try {
    return await bgr.findAllUser()
  } catch (errMsg) {
    logger.error({
      label: "[userService.ts - find_user]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

//USER Find Detail
async function find_user_detail(kakaoId: string) {
  const bgr = new userRepo;
  try {
    let searchFlag = await bgr.findUserFlag(kakaoId)  //유저 플래그 찾기

    //존재하지 않는 경우, 회원 자체가 없는 경우
    if (searchFlag[0] == undefined) throw "해당하는 유저가 존재하지 않습니다."

    //0일 경우가 일반 회원, 그 외에는 특수한 경우
    else if (!searchFlag[0].flag) return await bgr.findOneUser(kakaoId)

    else throw "해당 유저는 휴면상태입니다."

    return 0;

  } catch (errMsg) {
    logger.error({
      label: "[userService.ts - find_user_detail]",
      message: `\n\t└ input data(kakaoId) : ${kakaoId} \n\t└ err : ${errMsg} `
    })
    throw errMsg;
  }
}

//USER Update
async function update_user(bodyData: userDto) {
  const bgr = new userRepo;
  try {
    //유저 존재여부 파악
    if (await bgr.findOneUser(bodyData.kakaoId) != undefined) {
      await bgr.updateUser(bodyData)
      return bodyData.name; //APP단 TEST용도로 추가함.
    }
    logger.warn({
      label: "[userService.ts - update_user]",
      message: `\n\t└ input data(form) : ${bodyData.kakaoId}\n\t└ warning : 해당하는 유저가 존재하지 않습니다. `
    })
  } catch (errMsg) {
    logger.error({
      label: "[userService.ts - update_user]",
      message: `\n\t└ query : ${errMsg.query} \n\t└ input data(form) : ${errMsg.parameters} \n\t└ err : ${errMsg} `
    })
    throw errMsg;
  }
  return 0;  //유저가 없거나 에러가 발생한 경우
}

//USER Delete - Flag 변경
async function deleteUserFlag(kakaoId: string, flag: number) {
  const bgr = new userRepo;
  try {
    //유저 존재여부 파악
    if (await bgr.findOneUser(kakaoId) != undefined) {
      //Flag 상태 변경
      await bgr.updateUserFlag(kakaoId, flag)
      switch (Number(flag)) {
        case 1:
          return "성공적으로 삭제되었습니다";

        case 2:
          return "휴면처리가 완료되었습니다";
      }
    }
    else return "삭제할 유저가 존재하지 않습니다.";
  } catch (errMsg) {
    logger.error({
      label: "[userService.ts - delete_user]",
      message: `\n\t└ input data(flag) : ${flag} \n\t└ err : ${errMsg} `
    })
    throw errMsg;
  }
}

export {
  create_user,
  find_user,
  find_user_detail,
  update_user,
  deleteUserFlag
}