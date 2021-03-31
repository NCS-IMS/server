// import {Request, Response, NextFunction} from 'express'
// import { findAll, findDetail } from "../service/guestBookService";
// import { logger } from "../config/logger";

// //Main Page
// function guestBookMain(req:Request, res:Response ){ 
//     findAll()
//         .then(
//             (result)=>{
//                 res.send(result)
//             }
//         )//end then
//         .catch(
//             (e)=>{res.send(e)}
//         )//end catch
// }

// //Detail Page
// function guestBookDetail(req:Request, res:Response){
//     let guest_id : number = Number(req.query.gid); //check gid

//     if(isNaN(guest_id)){    // 숫자 타입 체크
//         logger.info({
//             label:"[guestBookDetail]",
//             message: `req.query.gid 값(${guest_id})이 숫자가 아님`
//         })
//         res.json({"message" : "Parameter ERR!"})
//     }//end if

//     findDetail(guest_id)
//         .then(
//             (result)=>{
//                 res.json(result)
//             }
//         )//end then
//         .catch(
//             (e)=>{
//                 logger.info({
//                     label:"[guestBookDetail]",
//                     message: `err : `+ e
//                 })
//                 res.json({"message" : "Parameter ERR!"})
//             }
//         )//end catch
// }

// //type gard (Number)
// function isNumber(val: string | number): val is number {
//     return typeof val === 'number';
// }

// export{
//     guestBookMain,
//     guestBookDetail
// }