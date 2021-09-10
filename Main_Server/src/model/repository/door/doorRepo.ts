import {EntityRepository, Repository, getRepository} from "typeorm";
import { doorDto } from "../../../interface/doorDto";
import { Door } from "../../entity/Door";

@EntityRepository(Door)
export class doorRepo extends Repository<Door> {

    //한 door Detail 출력
    findDoor(bodyData:doorDto) {
        return getRepository(Door)
        .createQueryBuilder()
        .select([
            "id",
            "breakerId"
        ])
        .where("id = :doorId", { doorId: bodyData.doorId })
        .execute();
    }

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