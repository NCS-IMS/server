import { callLogDto } from "../../interface/callLogDto";
import { logger } from "../../config/logger";
import request from 'request-promise-native';
// const request = require('')
//스케쥴 확인
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
    // .catch(err => callback(err));
    // request(options, async function (err: any, httpResponse: any, body: any){
    //    a = body.documents;
    //   return body.documents
    // })

    // var returnData: any;
    // request(options, async function(err: any, httpResponse: any, body: any){
    //   // console.log(body.documents)
    //   await (returnData = body.documents)
    //   // return await body.documents;
    // })
    // return await returnData;
  }catch (errMsg){
    logger.error({
      label: "[findHospital.ts - find_hospital]",
      message: `\n\t└ err : ${errMsg}`
    })
    throw errMsg;
  }
}

export {
  find_hospital
}