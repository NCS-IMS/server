import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("AID_Solution")
export class AID_Solution{
    @PrimaryGeneratedColumn()
    aid : number;

    @Column({
        length: 50,
        comment : '증상명'
    })
    symptom : string;

    @Column({
        length: 1000,
        comment: "해결책"
    })
    solution : string;
}