// import {Request, Response, NextFunction} from 'express'
// import * as boardContentService from "../../service/board/boardContentService";
// import { logger } from "../../config/logger";
// // import { boardContentDto } from "../../interface/boardContentDto";

// function callMain(req:Request, res:Response){
//     // let bodyData : boardContentDto ={
//     //     "title": req.body.title,
//     //     "content": req.body.content,
//     //     "user": {"email": req.body.userEmail},
//     //     "board_groups": {"group_id": req.body.group_id}
//     // }
//     res.send("hello!")
//     // boardContentService.create_Content()
//     //     .then(
//     //         (result: any)=>{
//     //             res.json({"message":result})
//     //         }
//     //     )//end then
//     //     .catch(
//     //         (err: any)=>{
//     //             logger.error({
//     //                 label:"[BoardContentController.ts - create_Content]",
//     //                 message: `\n\t└ input data(form) : ${bodyData} \n\t└ err : ${err} `
//     //             })
//     //             res.json({"message" : "알 수 없는 오류가 발생하였습니다!"})
//     //         }
//     //     )//end catch
// }

// export{
//     callMain,
// }