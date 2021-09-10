import {EntityRepository, Repository, getRepository} from "typeorm";
import { NuguUserInfo } from "../../entity/NuguUserInfo";
import {User} from "../../entity/User";

@EntityRepository(User)
export class nuguUserRepo extends Repository<User>{

    //앱 서비스 가입자 검색
    findUserInfo(userPhone: string){
        userPhone = userPhone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
        return getRepository(User)
            .createQueryBuilder()
            .select([
                "name",
                "phone",
                "gender",
                "address",
                "age",
                "birth"
            ])
            .where("phone = :phone",{phone : userPhone})
            .execute();
    }
}

@EntityRepository(NuguUserInfo)
export class saveNuguUser extends Repository<NuguUserInfo> {
    insertUserInfo(bodyData:NuguUserInfo) {
        return getRepository(NuguUserInfo).save(bodyData)
    }
}