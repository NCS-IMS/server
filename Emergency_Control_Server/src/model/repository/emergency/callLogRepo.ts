import { EntityRepository, Repository, getRepository } from "typeorm";
import { callLogDto } from "../../../interface/callLogDto";
import { Call_Log } from "../../entity/Call_Log";

@EntityRepository(Call_Log)
export class callLogRepo extends Repository<Call_Log> {
    insertLog(bodyData:callLogDto) {
        return getRepository(Call_Log).save(bodyData)
        // return getRepository(Board_Contents)
        //     .createQueryBuilder("bc")
        //     .insert()
        //     .into(Board_Contents)
        //     .values(bodyData)
        //     .execute()
    }

    checkLog_scheduleId(bodyData: Array<number>) {
        return getRepository(Call_Log)
            .createQueryBuilder("bc")
            .where("emScheduleId IN (:id)", { id: bodyData })
            .getMany()
    }
}