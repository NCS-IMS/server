import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { EM_Schedule } from "../../entity/EM_Schedule";

@EntityRepository(EM_Schedule)
export class emScheduleRepo extends Repository<EM_Schedule> {

    createSchedule(data: object){
        return getRepository(EM_Schedule).save(data)
    }

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
        .where("fireStationId = :fireStationId", {fireStationId: fireStationId})
        .andWhere("startDate < NOW()")
        .andWhere("endDate > NOW()")
        .execute();
    }

    // CAR NUM으로 시작날짜 < 현재 < 종료날짜인 스케쥴 id찾기
    findScheduleId_carNum(carNum: string){
        return getRepository(EM_Schedule)
        .createQueryBuilder()
        .select("id")
        .where("car_num = :car_num", {car_num: carNum})
        .andWhere("startDate < NOW()")
        .andWhere("endDate > NOW()")
        .execute();
    }
}
