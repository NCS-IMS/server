import { Request, Response, NextFunction } from 'express'
import {find_aidSolution, findUser, saveUser} from "../../service/apis/aid/nuguService";
import {NuguUserInfo} from "../../model/entity/NuguUserInfo"
async function findAid(req: Request, res: Response){
    try{
        var obj = req.body;
        var action = obj.action.parameters;
        var symptom = action.requestAID.value;
        console.log(symptom);
        find_aidSolution(symptom)
        .then(
            (result: any)=>{
                var json = JSON.stringify(result[0]);
                json = JSON.parse(json);
                console.log(json);
                obj.resultCode = "OK";
                obj.output = json;
                res.send(obj)
                res.end
            }
        )
    }catch (errMsg) {
        res.status(202).json({ "message": errMsg })
    }
}

async function enrollUser(req: Request, res : Response){
    var nuguUserInfo = new NuguUserInfo;
    try{
        var obj = req.body;
        var action = obj.action.parameters;
        var userPhone = action.userPhone.value;
        findUser(userPhone)
        .then(
            (result : any)=>{
                if(result == undefined){
                    obj.resultCode = "error_symp";
                    res.send(obj);
                    res.end;
                }else{
                    nuguUserInfo.name = result[0].name;
                    nuguUserInfo.phone = result[0].phone;
                    nuguUserInfo.gender = result[0].gender;
                    nuguUserInfo.address = result[0].address;
                    nuguUserInfo.age = result[0].age;
                    nuguUserInfo.birth = result[0].birth;
                }
            }
        ).then (()=>{
            saveUser(nuguUserInfo)
            .then(
                (result : any)=>{
                    if(result != "ok"){
                        obj.resultCode = "error_symp";
                        res.send(obj);
                        res.end;
                    }else{
                        var json = JSON.parse(`{"name": "${nuguUserInfo.name}"}`);
                        console.log(json);
                        obj.resultCode = "OK";
                        obj.output = json;
                        res.send(obj)
                        res.end
                    }
                }
            )
        })
    }catch(errMsg){
        res.status(202).json({ "message": errMsg })
    }
}

export {
    findAid,
    enrollUser
}