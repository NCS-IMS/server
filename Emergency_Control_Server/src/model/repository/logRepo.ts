import { EntityRepository, Repository, getRepository, getConnection } from "typeorm";
import { Call_Log } from "../entity/Call_Log";


@EntityRepository(Call_Log)
export class logRepo extends Repository<Call_Log> {
    //Emergency Man 찾기
    findLogAll(inter:number, ski:number, flag: number) {

        return getRepository(Call_Log)
            .createQueryBuilder()
            .select([
                "state",
                "latitude",
                "longitude",
                "isSelf",
                "emAddr",
                "userAddr",
                "anamnesis",
                "medicine",
                "flag"
            ])
            .skip(ski)
            .take(inter)
            .where("flag = :flag", { flag: flag })
            .execute();
    }
}
