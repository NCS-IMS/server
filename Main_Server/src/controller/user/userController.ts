import {Request, Response, NextFunction} from 'express'
import * as userService from "../../service/user/userService";
import { logger } from "../../config/logger";
import { userDto } from "../../interface/userDto";

//Create User
function createUser(req:Request, res:Response){
    // let files : any = req.files;
    
    let bodyData : userDto ={
        "kakaoId": req.body.kakaoId,
        "name": req.body.name,
        "gender": req.body.gender,
        "phone": req.body.phone,
        "address": req.body.address,
        "bloodType": req.body.bloodType,
        "email": req.body.email,
        "age": req.body.age,
        "flag": 0,
        "door": {"id": req.body.doorId}
        // "user": {"email": req.body.userEmail},
        // "board_groups": {"group_id": req.body.group_id}
    }
    //Image Check
    // if(files.imgSrc!=undefined) bodyData.imgSrc= files.imgSrc[0].originalname
    if(req.body.imgSrc != undefined) bodyData.imgSrc = req.body.imgSrc
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

//Find All User
function findAllUser(req:Request, res:Response){
    userService.find_user()
        .then(
            (result: any)=>{
                res.json({"message":result})
            }
        )//end then
        .catch(
            (err: any)=>{
                logger.error({
                    label:"[userController.ts - findAllUser]",
                    message: `\n\t└ err : ${err} `
                })
                res.json({"message" : "알 수 없는 오류가 발생하였습니다!"})
            }
        )//end catch
}

//Find One User
function findOneUser(req:Request, res:Response){
    let kakaoId: any = req.query.kakaoId;
    userService.find_user_detail(kakaoId)
        .then(
            (result: any)=>{
                res.json({"message":result})
            }
        )//end then
        .catch(
            (err: any)=>{
                logger.error({
                    label:"[userController.ts - findOneUser]",
                    message: `\n\t└ err : ${err} `
                })
                res.json({"message" : "알 수 없는 오류가 발생하였습니다!"})
            }
        )//end catch
}

//Update User
function updateUser(req:Request, res:Response){
    // let files : any = req.files;
    
    let bodyData : userDto ={
        "kakaoId": req.body.kakaoId,
        "name": req.body.name,
        "phone": req.body.phone,
        "address": req.body.address,
        "bloodType": req.body.bloodType,
        "age": req.body.age,
        // "door": {"id": req.body.doorId}
        // "user": {"email": req.body.userEmail},
        // "board_groups": {"group_id": req.body.group_id}
    }

    //Image Check
    // if(files.imgSrc!=undefined) bodyData.imgSrc= files.imgSrc[0].originalname
    // else bodyData.imgSrc= ''
    userService.update_user(bodyData)
        .then(
            (result: any)=>{
                var returnString: string = '';
                
                if(!result){
                    returnString= "Database Update ERR."
                    res.json({"message":returnString})
                }else{
                    returnString = "성공적으로 수정되었습니다."
                    res.json({
                        "message":returnString,
                        "name":result   //APP단 TEST용도로 추가함.
                    })
                }
                // res.json({"message":returnString})
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
//Find One User
function deleteUserFlag(req:Request, res:Response){
    let kakaoId: any = req.body.kakaoId;
    let flag: any = req.body.flag;

    userService.deleteUserFlag(kakaoId, flag)
        .then(
            (result: any)=>{
                res.json({"message":result})
            }
        )//end then
        .catch(
            (err: any)=>{
                logger.error({
                    label:"[userController.ts - deleteUserFlag]",
                    message: `\n\t└ err : ${err} `
                })
                res.json({"message" : "알 수 없는 오류가 발생하였습니다!"})
            }
        )//end catch
}
export{
    createUser,
    findAllUser,
    findOneUser,
    updateUser,
    deleteUserFlag
}