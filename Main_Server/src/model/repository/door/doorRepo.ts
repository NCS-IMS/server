import {EntityRepository, Repository, getRepository} from "typeorm";
import { doorDto } from "../../../interface/doorDto";
import { Door } from "../../entity/Door";

@EntityRepository(Door)
export class doorRepo extends Repository<Door> {

    //door 정보 수정
    updateDoorUuid(bodyData:doorDto) {
        return getRepository(Door)
        .createQueryBuilder()
        .update(Door)
        .set({UUID:bodyData.uuid})
        .where("id = :doorId", { doorId: bodyData.doorId })
        .execute();
    }
}