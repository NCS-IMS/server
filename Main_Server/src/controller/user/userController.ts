import {Request, Response, NextFunction} from 'express'
import * as userService from "../../service/user/userService";
import { logger } from "../../config/logger";
import { userDto } from "../../interface/userDto";

//Create User
function createUser(req:Request, res:Response){
    let files : any = req.files;
    
    let bodyData : userDto ={
        "rrn": req.body.rrn,
        "name": req.body.name,
        "gender": req.body.gender,
        "phone": req.body.phone,
        "address": req.body.address,
        "medicine": req.body.medicine,
        "imgSrc": files.imgSrc[0].originalname,
        "door": {"id": req.body.doorId}
        // "user": {"email": req.body.userEmail},
        // "board_groups": {"group_id": req.body.group_id}
    }
    userService.create_user(bodyData)
        .then(
            (result: any)=>{
                res.json({"message":result})
            }
        )//end then
        .catch(
            (err: any)=>{
                logger.error({
                    label:"[userController.ts - create_user]",
                    message: `\n\t└ input data(form) : ${bodyData} \n\t└ err : ${err} `
                })
                res.json({"message" : "알 수 없는 오류가 발생하였습니다!"})
            }
        )//end catch
}

export{
    createUser,
}