import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";

import { Fire_Station } from "./Fire_Station";
import { Emergency_Room } from "./Emergency_Room";
@Entity("Control_Tower")
export class Control_Tower{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        comment: '이름'
    })
    name: string;

    @Column({
        type:"tinyint",
        comment: '성별(남:1/여:0)'
    })
    gender: boolean;

    @Column({
        length: 13,
        comment: '전화번호(- 포함)'
    })
    phone: string;

    @Column({
        length: 100,
        comment: '주소'
    })
    address: string;

    @Column({
        length: 100,
        nullable: true,
        comment: '복용중인 약 체크(,로 표시)'
    })
    medicine: string;

    @Column({
        length: 100,
        nullable: true,
        comment: '병력'
    })
    hospitalHistory: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    //  FK AREA
    //  to Fire_station
    @ManyToOne(
        (type)=>Fire_Station,
        (fire_station)=>fire_station.control_tower,
        {nullable: false}
    )
    fire_station: Fire_Station

    //  to emergency_room
    @ManyToOne(
        (type)=>Emergency_Room,
        (emergency_room)=>emergency_room.control_tower,
        {nullable: false}
    )
    emergency_room: Emergency_Room
}
