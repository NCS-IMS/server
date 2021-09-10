import { callLogDto } from "../../interface/callLogDto";
import { logger } from "../../config/logger";
import requestModule from "../../middleware/request"

//병원 위치 찾기
async function find_hospital(bodyData: callLogDto) {
  try {
    let group_cord: string = "HP8"; //병원
    let radius: number = 20000;     //범위
    let parseUrl = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${group_cord}&radius=${radius}&x=${bodyData.latitude}&y=${bodyData.longitude}`
    return requestModule(parseUrl, 'GET', 'kakao')
    
  }catch (errMsg){
    logger.error({
      label: "[findHospital.ts - find_hospital]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

//사용자 위치 확인
async function find_userLocation(bodyData: callLogDto) {
  try {
    let parseUrl = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${bodyData.longitude}&y=${bodyData.latitude}`
    return requestModule(parseUrl, 'GET', 'kakao')

  }catch (errMsg){
    logger.error({
      label: "[findHospital.ts - find_userLocation]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

// 공공기관 확인
async function find_publicInstitutions(bodyData: callLogDto, pageCount: number) {
  try {
    let group_cord: string = "PO3"; // 공공기관
    let radius: number = 20000;     // 범위
    let parseUrl = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${group_cord}&radius=${radius}&x=${bodyData.longitude}&y=${bodyData.latitude}&page=${pageCount}`
    return requestModule(parseUrl, 'GET', 'kakao')

  }catch (errMsg){
    logger.error({
      label: "[findHospital.ts - find_fireStation]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

//응급실 위치 찾기
async function find_emergencyRoom(bodyData: any) {
  try {
    let group_cord: string = "HP8"; //병원
    let radius: number = 20000;     //범위
    let parseUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?&x=${bodyData.longitude}&y=${bodyData.latitude}&radius=${radius}&query=${encodeURI("응급실")}`
    return requestModule(parseUrl, 'GET', 'kakao')
    
  }catch (errMsg){
    logger.error({
      label: "[findHospital.ts - find_emergencyRoom]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

export { 
  find_hospital,
  find_userLocation,
  find_publicInstitutions,
  find_emergencyRoom
};