import { EntityRepository, Repository, getRepository, getConnection} from "typeorm";
import { manageScheduleDto } from "../../../interface/manageScheduleDto";
import { Emergency_Man } from "../../entity/Emergency_Man";
import { EM_Schedule } from "../../entity/EM_Schedule";

@EntityRepository(Emergency_Man)
export class manageScheduleRepo extends Repository<Emergency_Man> {

    //스케쥴 추가
    async addSchedule() {//bodyData: manageScheduleDto

        const em_schedule = new EM_Schedule();
        em_schedule.id = 2;
        // await  getRepository(EM_Schedule).save(em_schedule)
        
        const em_schedule1 = new EM_Schedule();
        em_schedule1.id = 1;
        // await  getRepository(EM_Schedule).save(em_schedule1)
        
        const emergency_man = new Emergency_Man();
        emergency_man.kakaoId = "1714222103";

        emergency_man.em_schedule = [em_schedule, em_schedule1]

        return getRepository(Emergency_Man).save(emergency_man)

        // return getRepository(Board_Contents)
        //     .createQueryBuilder("bc")
        //     .insert()
        //     .into(Board_Contents)
        //     .values(bodyData)
        //     .execute()
    }

}