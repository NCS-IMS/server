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
}