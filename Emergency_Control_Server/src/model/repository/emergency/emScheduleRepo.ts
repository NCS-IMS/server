import { EntityRepository, Repository, getRepository } from "typeorm";
import { emScheduleDto } from "../../../interface/emScheduleDto";
import { EM_Schedule } from "../../entity/EM_Schedule";

@EntityRepository(EM_Schedule)
export class callLogRepo extends Repository<EM_Schedule> {

    //스케쥴 추가
    addSchedule(bodyData:emScheduleDto) {
        return getRepository(EM_Schedule).save(bodyData)
        // return getRepository(Board_Contents)
        //     .createQueryBuilder("bc")
        //     .insert()
        //     .into(Board_Contents)
        //     .values(bodyData)
        //     .execute()
    }
}