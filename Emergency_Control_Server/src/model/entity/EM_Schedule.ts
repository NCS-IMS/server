import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Fire_Station } from "./Fire_Station";

@Entity("EM_Schedule")
export class EM_Schedule{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50,
        comment: '이름'
    })
    name: string;

    @Column({
        length: 8,
        comment: '구급차의 차 번호'
    })
    car_num: string;

    @Column({
        type:"longtext",
        default: '{"mac": []}',
        comment: '응급구조사들의 ID값'
    })
    mans: string;

    // @Column({
    //     type:"longtext",
    //     default: '{"mac": []}',
    //     comment: '응급구조사들의 MAC 주소'
    // })
    // mac_addr: string;

    // @Column({
    //     type:"longtext",
    //     default: '{"emt": []}',
    //     comment: 'Emergency Medical Technician : 응급 의료 기술자'
    // })
    // emt: string;

    @Column({
        length: 100,
        comment: '주소'
    })
    address: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    //  FK AREA
    //  to Fire_station
    @ManyToOne(
        (type)=>Fire_Station,
        (fire_station)=>fire_station.em_schedule,
        {nullable: false}
    )
    fire_station: Fire_Station
}
