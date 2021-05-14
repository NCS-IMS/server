import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { EM_Schedule } from "./EM_Schedule";
@Entity("Call_Log")
export class Call_Log{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '응급 환자 카카오 회원 ID',
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
    isSelf: boolean;
    
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

    @Column({
        comment: '응급 환자의 작성 주소',
        length: 100,
        nullable:true
    })
    userAddr: string;
    
    @Column({
        comment: '응급 상황 발생한 위치',
        length: 100,
        nullable:true
    })
    emAddr: string;

    @Column({
        comment: '환자 과거 벙력',
        length: 50,
        nullable:true
    })
    anamnesis: string;

    @Column({
        comment: '환자 복용중인 약 정보',
        length: 50,
        nullable:true
    })
    medicine: string;

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