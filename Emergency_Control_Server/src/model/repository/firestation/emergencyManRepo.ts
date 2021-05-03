import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { Emergency_Man } from "../../entity/Emergency_Man";

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
}
