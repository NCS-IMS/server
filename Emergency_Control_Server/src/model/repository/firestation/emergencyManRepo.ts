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

    //User Flag 찾기
    findUserFlag(kakaoId : string) {
        return getRepository(Emergency_Man)
        .createQueryBuilder()
        .select("flag")
        .where("kakaoId = :kakaoId", { kakaoId: kakaoId })
        .execute();
    }
    
    // user Image SRC 수정
    updateUserImage(bodyData: emergencyManDto) {
        return getRepository(Emergency_Man)
        .createQueryBuilder()
        .update(Emergency_Man)
        .set({imgSrc:bodyData.imgSrc})
        .where("kakaoId = :id", { id: bodyData.kakaoId })
        .execute();
    }

    // user UUID / Token 수정
    restoreUserUuidToken(bodyData: emergencyManDto) {
        return getRepository(Emergency_Man)
        .createQueryBuilder()
        .update(Emergency_Man)
        .set({
            uuid:bodyData.uuid,
            token:bodyData.token
        })
        .where("kakaoId = :id", { id: bodyData.kakaoId })
        .execute();
    }
    
    // firestation id 수정
    modifyFID(bodyData: emergencyManDto) {
        return getRepository(Emergency_Man)
        .createQueryBuilder()
        .update(Emergency_Man)
        .set({ fireStationId:bodyData.fireStationId })
        .where("kakaoId = :id", { id: bodyData.kakaoId })
        .execute();
    }
}
