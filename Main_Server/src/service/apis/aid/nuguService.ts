import {aidRepo} from "../../../model/repository/nugu/aidRepo";
import {nuguUserRepo, saveNuguUser} from "../../../model/repository/nugu/userRepo";
import {logger} from "../../../config/logger";
import { NuguUserInfo } from "../../../model/entity/NuguUserInfo";

async function find_aidSolution(symptom: string) {
    const arp = new aidRepo;
    try{
        var result = await arp.findAidSolution(symptom);
        if(result != undefined){
            return result;
        }else{
            throw "no"
        }
    }catch(errMsg){
        logger.error({
            label : "[nuguService.ts - find_aidSolution]",
            message: `\n\t └ err : ${errMsg}`
        })
        throw errMsg;
    }
}

async function findUser(userPhone : string) {
    const nrp = new nuguUserRepo;
    try{
        var result = await nrp.findUserInfo(userPhone);
        if(result != undefined){
            return result;
        }else{
            return undefined;
        }
    }catch(errMsg){
        logger.error({
            label : "[nuguService.ts - findUser]",
            message: `\n\t └ err : ${errMsg}`
        })
        throw errMsg;
    }
}

async function saveUser(bodyData:NuguUserInfo) {
    const srp = new saveNuguUser;
    try{
        await srp.insertUserInfo(bodyData);
        return "ok";
    }catch(errMsg){
        logger.error({
            label : "[nuguService.ts - saveUser]",
            message: `\n\t └ err : ${errMsg}`
        })
        throw errMsg;
    }
}

export{
    find_aidSolution,
    findUser,
    saveUser
}
