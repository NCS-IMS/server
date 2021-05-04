import request from 'request-promise-native';
import { requestDto } from "../interface/requestDto";

//method : get, post 
//type: kakao: 카카오 , Public Data Portal(pdp): 공공데이터포털
function requestModule(url:string, method:string, type:string){
  let options :requestDto = { //option 지정
    uri:url,
    method: method,
    // body: {
    //   kakaoId:'f',
    // },
    json:true,
  }
  

  if(type=='pdp'){

  }else if(type='kakako'){
    options.headers = { Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}` }
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