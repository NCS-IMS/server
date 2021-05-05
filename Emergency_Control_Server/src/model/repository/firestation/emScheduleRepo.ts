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

    //fireStation ID를 갖고 시작날짜 < 현재 < 종료날짜인 스케쥴 찾기
    findScheduleDate_fireStationId(fireStationId: string){
        return getRepository(EM_Schedule)
        .createQueryBuilder()
        .select([
            "id",
            "car_num",
            "notice",
            "startDate",
            "endDate"
        ])
        .where("fireStationId = :id", {id: fireStationId})
        .andWhere("startDate < NOW()")
        .andWhere("endDate > NOW()")
        .execute();
    }
}
