import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import { Door_Log } from "./Door_Log";

@Entity("Door")
export class Door{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"tinyint",
        comment: '비콘 사용 가능 여부(1/0)'
    })
    beacon_useable: boolean;

    @Column({
        length: 512,
        comment: 'MAC 주소'
    })
    UUID: string;

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    //  FK AREA
    //  LOG
    @OneToMany(
        (type)=>Door_Log,
        (door_log)=>door_log.door
    )
    door_log:Door_Log[];

    @OneToMany(
        (type)=>User,
        (user)=>user.door
    )
    user:User[];
}
