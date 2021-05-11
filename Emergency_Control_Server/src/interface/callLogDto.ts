export interface callLogDto{
    // id?:number;
    id?:number;
    kakaoId:string;
    state:string;
    isSelf:boolean;
    latitude:number;
    longitude:number;
    userAddr:string;

    //필수 정보 X, 개인정보이기에 DB 저장 X
    medicine?:string;   //복용중인 약
    anamnesis?:string;  //병력
    em_schedule?: object;   //emscheduleid
    emAddr?:string;
}