import { callLogDto } from "../../interface/callLogDto";
import { logger } from "../../config/logger";
import request from 'request-promise-native';

//병원 위치 찾기
async function find_hospital(bodyData: callLogDto) {
  try {
    let group_cord: string = "HP8";
    let radius: number = 20000;

    const options = { //option 지정
      uri:`https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${group_cord}&radius=${radius}&x=${bodyData.latitude}&y=${bodyData.longitude}`,
      method: 'GET',
      // body: {
      //   kakaoId:'f',
      // },
      json:true,
      headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
    }
    let a :any ;
    return request(options)
    .then(
      (result:any)=>{
        return result;
      }
    )
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

    const options = { //option 지정
      uri:`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${bodyData.longitude}&y=${bodyData.latitude}`,
      method: 'GET',
      // body: {
      //   kakaoId:'f',
      // },
      json:true,
      headers: { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` },
    }
    return request(options)
    .then(
      (result:any)=>{
        return result.documents[0].address.address_name;  //뽑기
      }
    )

  }catch (errMsg){
    logger.error({
      label: "[findHospital.ts - find_userLocation]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}
export { 
  find_hospital,
  find_userLocation
};