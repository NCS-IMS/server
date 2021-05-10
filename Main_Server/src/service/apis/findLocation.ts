import { findDirectionDto } from "../../interface/findDirectionDto";
import { logger } from "../../config/logger";
import requestModule from "../../middleware/request"

//병원 위치 찾기
async function find_hospital(bodyData: findDirectionDto) {
  try {
    let group_cord: string = "HP8"; //병원
    let radius: number = 20000;     //범위
    let parseUrl = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${group_cord}&radius=${radius}&x=${bodyData.longitude}&y=${bodyData.latitude}`
    return requestModule(parseUrl, 'GET', 'kakao')
    
  }catch (errMsg){
    logger.error({
      label: "[findLocation.ts - find_hospital]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

//약국 위치 찾기
async function find_pharmacy(bodyData: findDirectionDto) {
  try {
    let group_cord: string = "PM9"; // 약국
    let radius: number = 20000;     //범위
    let parseUrl = `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${group_cord}&radius=${radius}&x=${bodyData.longitude}&y=${bodyData.latitude}`
    return requestModule(parseUrl, 'GET', 'kakao')
    
  }catch (errMsg){
    logger.error({
      label: "[findLocation.ts - find_pharmacy]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

export { 
  find_hospital,
  find_pharmacy
};