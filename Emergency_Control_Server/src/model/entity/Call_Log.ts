import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { EM_Schedule } from "./EM_Schedule";
@Entity("Call_Log")
export class Call_Log{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '카카오 회원 ID',
        length: 20
    })
    kakaoId: string;

    @Column({
        comment: '응급 상황',
        length: 20
    })
    state: string;

    @Column({
        type:"tinyint",
        comment: '본인여부 (본인:1/타인:0)'
    })
    is_self: boolean;
    
    @Column({
        type:"double",
        comment: '발생 위치 위도'
    })
    latitude: number;

    @Column({
        type:"double",
        comment: '발생 위치 경도'
    })
    longitude: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    @ManyToOne(
        (type)=>EM_Schedule,
        (em_schedule)=>em_schedule.call_log,
    )
    em_schedule: EM_Schedule
    
}