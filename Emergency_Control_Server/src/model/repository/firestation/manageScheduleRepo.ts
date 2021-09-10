import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { manageScheduleDto } from "../../../interface/manageScheduleDto";
import { Emergency_Man } from "../../entity/Emergency_Man";
import { EM_Schedule } from "../../entity/EM_Schedule";


@EntityRepository(Emergency_Man)
export class manageScheduleRepo extends Repository<Emergency_Man> {

    async findAll() {
        return getRepository(EM_Schedule).find();
    }

    async findSchedule(date: any) {
        return getRepository(EM_Schedule)
        .createQueryBuilder()
        .select([
            "id",
            "notice",
            "startDate",
            "endDate",
            "fireStationId",
            "car_num"
        ])
        .where("DATE(startDate) = :date", { date: date })
        .execute();
    }

    //다대다로 설정된 스케쥴 추가
    async addSchedule(bd: any, bodyData: manageScheduleDto) {
        const em_schedule = new EM_Schedule();
        em_schedule.id = bodyData.scheduleId;       //schedule id 먼저 Save

        const emergency_man = new Emergency_Man();
        emergency_man.kakaoId = bodyData.kakaoId;   //Kakao id Save

        emergency_man.em_schedule = [...bd, em_schedule]    //find했던것과 현재값을 넣는다.
        return getRepository(Emergency_Man).save(emergency_man)

        // return getRepository(Board_Contents)
        //     .createQueryBuilder("bc")
        //     .insert()
        //     .into(Board_Contents)
        //     .values(bodyData)
        //     .execute()
    }

    //다대다로 설정된 emergency_man 찾기 - kakaoId
    findManageSchedule_KakaoId(bodyData: manageScheduleDto) {
        // return getRepository(Emergency_Man).find({relations:["em_schedule"]})
        return getRepository(Emergency_Man)
            .createQueryBuilder("Emergency_Man")
            .leftJoinAndSelect("Emergency_Man.em_schedule", "em_schedule")
            .where("kakaoId = :kakaoId", { kakaoId: bodyData.kakaoId })
            .andWhere("DATE(startDate) = DATE(:startDate)", { startDate: bodyData.startDate })
            .getMany()

        // return getRepository(Emergency_Man)
        // .createQueryBuilder()
        // .select("kakaoId")
        // .where("kakaoId = :kakaoId", { kakaoId: "1714222103" })
        // .execute();
    }
    
    //다대다로 설정된 emergency_man 찾기 - scheduleId
    findManageSchedule_scheduleId(scheduleId: string) {
        // return getRepository(Emergency_Man).find({relations:["em_schedule"]})
        return getRepository(Emergency_Man)
            .createQueryBuilder("Emergency_Man")
            .leftJoinAndSelect("Emergency_Man.em_schedule", "em_schedule")
            .where("id = :scheduleId", { scheduleId: scheduleId })
            .getMany()

        // return getRepository(Emergency_Man)
        // .createQueryBuilder()
        // .select("kakaoId")
        // .where("kakaoId = :kakaoId", { kakaoId: "1714222103" })
        // .execute();
    }


    //이미 지정이 되어있는지 확인
    findManageScheduleAll(bodyData: manageScheduleDto) {
        // return getRepository(Emergency_Man).find({relations:["em_schedule"]})
        return getRepository(Emergency_Man)
            .createQueryBuilder("Emergency_Man")
            .leftJoinAndSelect("Emergency_Man.em_schedule", "em_schedule")
            .where("kakaoId = :kakaoId", { kakaoId: bodyData.kakaoId })
            .andWhere("id = :scheduleId", { scheduleId: bodyData.scheduleId })
            .getMany()

        // return getRepository(Emergency_Man)
        // .createQueryBuilder()
        // .select("kakaoId")
        // .where("kakaoId = :kakaoId", { kakaoId: "1714222103" })
        // .execute();
    }

    //다대다로 설정된 emergency_man 찾기 - scheduleId
    findManageUUID_scheduleId(scheduleId: number) {
        return getRepository(Emergency_Man)
            .createQueryBuilder("Emergency_Man")
            .select([
                "Emergency_Man.kakaoId",
                "Emergency_Man.uuid"
            ])
            .leftJoin("Emergency_Man.em_schedule", "em_schedule")
            .where("id = :scheduleId", { scheduleId: scheduleId })
            .getMany()
    }

}
