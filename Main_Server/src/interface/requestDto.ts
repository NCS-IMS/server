export interface requestDto{
    // id?:number;
    uri:string;
    method:string;
    json:boolean;
    body?:object;
    headers?:object;
}