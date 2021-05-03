import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { EM_Schedule } from "../../entity/EM_Schedule";

@EntityRepository(EM_Schedule)
export class emScheduleRepo extends Repository<EM_Schedule> {

    //Emergency Man 찾기
    findSchedule_scheduleId(scheduleId: number){
        return getRepository(EM_Schedule)
        .createQueryBuilder()
        .select("id")
        .where("id = :id", { id: scheduleId })
        .execute();
    }
}
