import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { Door } from "./Door";

@Entity("Door_Log")
export class Door_Log{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "tinyint",
        comment: "출입문 개폐 승인 여부"
    })
    door_useable: boolean;

    @CreateDateColumn()
    createDate: Date;

    //  FK AREA
    //  Door
    @ManyToOne(
        (type)=>Door,
        (door)=>door.door_log,
        {nullable: false}
    )
    door: Door
}
