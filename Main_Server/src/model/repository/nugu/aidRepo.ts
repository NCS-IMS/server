import {EntityRepository, Repository, getRepository} from "typeorm";
import {AID_Solution} from "../../entity/AID_Solution";

@EntityRepository(AID_Solution)
export class aidRepo extends Repository<AID_Solution>{

    //응급처치 정보 가져오기
    findAidSolution(symptomName: string){
        return getRepository(AID_Solution)
            .createQueryBuilder()
            .select([
                "symptom",
                "solution"
            ])
            .where("symptom = :symptom",{symptom : symptomName})
            .execute();
    }
}