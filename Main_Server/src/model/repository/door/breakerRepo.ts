import {EntityRepository, Repository, getRepository} from "typeorm";
import { doorDto } from "../../../interface/doorDto";
import { Breaker } from "../../entity/Breaker";

@EntityRepository(Breaker)
export class breakerRepo extends Repository<Breaker> {

    //door 정보 수정
    updateBreakerCarNum(id: number, car_num: string) {
        return getRepository(Breaker)
        .createQueryBuilder()
        .update(Breaker)
        .set({car_num: car_num})
        .where("id = :doorId", { doorId: id })
        .execute();
    }
}