import {EntityRepository, Repository, getRepository} from "typeorm";
import { userDto } from "../../../interface/userDto";
import { Control_Tower } from "../../entity/Control_Tower";

@EntityRepository(Control_Tower)
export class userRepo extends Repository<Control_Tower> {
    insertUser(bodyData:userDto) {
        return getRepository(Control_Tower).save(bodyData)
        // return getRepository(Board_Contents)
        //     .createQueryBuilder("bc")
        //     .insert()
        //     .into(Board_Contents)
        //     .values(bodyData)
        //     .execute()
    }
}