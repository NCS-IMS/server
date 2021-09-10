import {EntityRepository, Repository, getRepository} from "typeorm";
import { userDto } from "../../../interface/userDto";
import { User } from "../../entity/User";

@EntityRepository(User)
export class userRepo extends Repository<User> {
    //User 추가
    insertUser(bodyData:userDto) {
        return getRepository(User).save(bodyData)
        // return getRepository(Board_Contents)
        //     .createQueryBuilder("bc")
        //     .insert()
        //     .into(Board_Contents)
        //     .values(bodyData)
        //     .execute()
    }

    //User Flag 찾기
    findUserFlag(kakaoId : string) {
        return getRepository(User)
        .createQueryBuilder()
        .select("flag")
        .where("kakaoId = :kakaoId", { kakaoId: kakaoId })
        .execute();
    }

    //모든 User 출력
    findAllUser() {
        // return getRepository(User).find();
        return getRepository(User)
        .createQueryBuilder()
        .select([
            "name",
            "gender",
            "email",
        ])
        .where("flag = 0")
        .execute();
    }

    //한 User의 Detail 출력
    findOneUser(kakaoId : string) {
        return getRepository(User).findOne({
            select:([
                "name",
                "phone",
                "birth",
                "address",
                "bloodType",
            ]),
            where:{kakaoId : kakaoId},
        });
    }

    //User 정보 수정
    updateUser(bodyData:userDto) {
        return getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set(bodyData)
        .where("kakaoId = :kakaoId", { kakaoId: bodyData.kakaoId })
        .execute();
    }

    //user Flag 수정
    updateUserFlag(kakaoId : string, flag : number) {
        return getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set({flag:flag})
        .where("kakaoId = :id", { id: kakaoId })
        .execute();
    }
}