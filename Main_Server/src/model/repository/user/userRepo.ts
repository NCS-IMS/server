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
    findAllUser() {
        return getRepository(User).find();
    }
    findOneUser(kakaoId : string) {
        return getRepository(User).findOne({
            where:{kakaoId : kakaoId}
        });
    }
    updateUser(kakaoId : string) {
        return getRepository(User)
        .createQueryBuilder()
        .update(User)
        .set({ 
            name: "Timber", 
            gender: true,
            age: () => "age + 1"
        })
        .where("id = :id", { id: 1 })
        .execute();
    }
}