import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { Emergency_Man } from "../../entity/Emergency_Man";
import { emergencyManDto } from "../../../interface/emergencyManDto";

@EntityRepository(Emergency_Man)
export class emergencyManRepo extends Repository<Emergency_Man> {

    //Emergency Man 찾기
    findEmergencyMan(kakaoId: string) {
        return getRepository(Emergency_Man)
            .createQueryBuilder()
            .select("kakaoId")
            .where("kakaoId = :kakaoId", { kakaoId: kakaoId })
            .execute();
    }

    //Emergency Man 맹글기
    createEmergencyMan(bodyData: emergencyManDto) {
        return getRepository(Emergency_Man).save(bodyData)
    }
    
}
