import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";

import { Control_Tower } from "./Control_Tower";
@Entity("Emergency_Room")
export class Emergency_Room{

    @Column({
        primary : true,
        length: 15,
        comment: '응급실 ID'
    })
    id: string;

    @Column({
        length: 50,
        comment: '이름'
    })
    name: string;

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
        type:"double",
        comment: '응급실 위도'
    })
    latitude: number;

    @Column({
        type:"double",
        comment: '응급실 경도'
    })
    longitude: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    //  for control_tower
    @OneToMany(
        (type)=>Control_Tower,
        (control_tower)=>control_tower.emergency_room
    )
    control_tower:Control_Tower[];

}
