import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";
import { EM_Schedule } from "./EM_Schedule";
import { Control_Tower } from "./Control_Tower";

@Entity("Fire_Station")
export class Fire_Station{

    @Column({
        primary : true,
        length: 15,
        comment: '소방서 ID'
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
        comment: '위도'
    })
    latitude: number;

    @Column({
        type:"double",
        comment: '경도'
    })
    longitude: number;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    //  FK AREA
    //  for em_schedule
    @OneToMany(
        (type)=>EM_Schedule,
        (em_schedule)=>em_schedule.fire_station
    )
    em_schedule:EM_Schedule[];

    //  for control_tower
    @OneToMany(
        (type)=>Control_Tower,
        (control_tower)=>control_tower.fire_station
    )
    control_tower:Control_Tower[];

}
