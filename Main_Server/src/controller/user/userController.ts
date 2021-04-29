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
function test (req:Request, res:Response){
    var request = require('request');
    var ff = {
        title:"hello my",
        body:"BRO",
        token:[
            "edJhijkqQ-mEgTt7bONnrh:APA91bGPHLda78vBSVzCqqZTk0ij4iu8x0m4nc27pzRsbF7xzV6LCymFZYOlvezoWbQK_CwmIbwgf_cVI-BHPy5gSq9hesyWe04TbpMUDl7T92k4MA9eaH5fOCNgSuGDMARlfpfXzEnm",
            "f6_TfMnCQUG6ut7sbTLziX:APA91bGgcN1sjZ5WBYgL_67ITKirjoFVYCGwWAI9ZX9eTM0OUF8oZdiKbu1fn9kSEo7NapvwzN407Zz5nsZg-zXEnFjzem4ZZkfnMgOV1LYBy93HNH7NUNXNPCCc2ao3P4u--0yp8RGB"
          ]
    }
    request.post({
        headers: {'content-type':'application/json'},
        url: 'http://conative.myds.me:43043/proxy/fcm/individual',
        body: ff,
        json:true
        }, function(err : any, response: any, body: any){
            res.json('body');
    })
}
export{
    createUser,
    findAllUser,
    findOneUser,
    updateUser,
    deleteUserFlag,
    test
}