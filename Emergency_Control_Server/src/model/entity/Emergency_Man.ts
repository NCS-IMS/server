import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable} from "typeorm";
import { EM_Schedule } from "./EM_Schedule";
import { Fire_Station } from "./Fire_Station";

@Entity("Emergency_Man")
export class Emergency_Man{

    @Column({
        primary : true,
        length: 50,
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
        length: 36,
        comment: '응급구조사의 UUID 주소'
    })
    uuid: string;
    
    @Column({
        length: 256,
        nullable: true,
        comment: '사진 경로'
    })
    imgSrc?: string;

    @Column({
        length: 30,
        nullable: true,
        comment: '이메일'
    })
    email?: string;

    @Column({
        type:"tinyint",
        default: 0,
        comment: '상태 (0:정상 / 1:회원탈퇴)'
    })
    flag?: number;

    @Column({
        type:"date",
        comment: '생일'
    })
    birth: Date;

    @Column({
        type:"tinyint",
        comment: '성별 (남:1/여:0)'
    })
    gender: boolean;

    @Column({
        length: 256,
        comment: '푸시메시지 토큰 값'
    })
    token: string;

    @Column({
        length: 10,
        comment: '소방서 ID'
    })
    fireStationId: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    //  for Fire_station
    // @ManyToOne(
    //     (type)=>Fire_Station,
    //     (fire_station)=>fire_station.emergency_man,
    //     {nullable: false}
    // )
    // fire_station: Fire_Station

    @ManyToMany(()=>EM_Schedule)
    @JoinTable()
    em_schedule:EM_Schedule[]
    // @OneToMany(
    //     (type)=>Schedule_Man,
    //     (schedule_man)=>schedule_man.em_schedule
    // )
    // schedule_man:Schedule_Man[];
}
