import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { EM_Schedule } from "./EM_Schedule";
import { Fire_Station } from "./Fire_Station";
@Entity("Emergency_Man")
export class Emergency_Man{

    @Column({
        primary : true,
        length: 20,
        comment: '카카오 회원 ID'
    })
    kakaoId: string;

    @Column({
        length: 50,
        comment: '응급구조사 이름'
    })
    name: string;

    @Column({
        length: 13,
        comment: '전화번호(- 포함)'
    })
    phone: string;

    @Column({
        length: 20,
        comment: '응급구조사의 MAC 주소'
    })
    mac: string;

    @Column({
        length: 256,
        comment: '푸시메시지 토큰 값'
    })
    token: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    //  for Fire_station
    @ManyToOne(
        (type)=>Fire_Station,
        (fire_station)=>fire_station.emergency_man,
        {nullable: false}
    )
    fire_station: Fire_Station

    @ManyToMany(()=>EM_Schedule)
    @JoinTable()
    em_schedules:EM_Schedule[]
    // @OneToMany(
    //     (type)=>Schedule_Man,
    //     (schedule_man)=>schedule_man.em_schedule
    // )
    // schedule_man:Schedule_Man[];
}
