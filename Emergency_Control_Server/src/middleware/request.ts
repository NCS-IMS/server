import request from 'request-promise-native';
import { requestDto } from "../interface/requestDto";

//method : get, post 
//type: kakao: 카카오 , Public Data Portal(pdp): 공공데이터포털
function requestModule(url:string, method:string, type:string, bodyData?:any){
  let options :requestDto = { //option 지정
    uri:url,
    method: method,
    // body: {
    //   kakaoId:'f',
    // },
    json:true,
  }
  
  if(method == 'POST'){
    options.body = bodyData
  }

  if(type=='pdp'){
    options.uri+=`&serviceKey=${process.env.PDP_API_KEY}`
  }else if(type=='kakao'){
    options.headers = {
      Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`
     }
  }else if(type=='etc'){
    
  }else{
    throw `Request Middleware에 ${type}이(가) 들어왔습니다.`
  }

  return request(options)
  .then(
    (result:any)=>{
      return result;
    }
  )
}

export default requestModule;