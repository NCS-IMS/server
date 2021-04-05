import {EntityRepository, Repository, getRepository} from "typeorm";
import { userDto } from "../../../interface/userDto";
import { User } from "../../entity/User";

@EntityRepository(User)
export class userRepo extends Repository<User> {
    insertUser(bodyData:userDto) {
        return getRepository(User).save(bodyData)
        // return getRepository(Board_Contents)
        //     .createQueryBuilder("bc")
        //     .insert()
        //     .into(Board_Contents)
        //     .values(bodyData)
        //     .execute()
    }
    findUserFlag(kakaoId : string) {
        return getRepository(User)
        .createQueryBuilder()
        .select("flag")
        .where("kakaoId = :kakaoId", { kakaoId: kakaoId })
        .execute();
    }

    findAllUser() {
        // return getRepository(User).find();
        return getRepository(User)
        .createQueryBuilder()
        .where("flag = 0")
        .execute();
    }

    findOneUser(kakaoId : string) {
        return getRepository(User).findOne({
            where:{kakaoId : kakaoId}
        });
    }

    updateUser(bodyData:userDto) {
        return getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set(bodyData)
        .where("kakaoId = :kakaoId", { kakaoId: bodyData.kakaoId })
        .execute();
    }
}