import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";

import { Door } from "./Door";
@Entity("Breaker")
export class Breaker{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        length: 256,
        comment: '구급차의 차 번호'
    })
    car_num: string;

    @OneToMany(
        (type)=>Door,
        (door)=>door.breaker
    )
    door:Door[];
    
}
