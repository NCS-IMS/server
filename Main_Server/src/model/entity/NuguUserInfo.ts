import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("NuguUserInfo")
export class NuguUserInfo{
    @PrimaryGeneratedColumn()
    uid : number;

    @Column({
        length: 20,
        comment: '이름'
    })
    name: string;


    @Column({
        length: 13,
        comment: '전화번호(- 포함)'
    })
    phone: string;

    @Column({
        type:"tinyint",
        comment: '성별 (남:1/여:0)'
    })
    gender: boolean;

    @Column({
        length: 100,
        comment: '주소'
    })
    address: string;

    @Column({
        nullable: true,
        comment: '나이'
    })
    age: number;

    @Column({
        type:"date",
        comment: '생일'
    })
    birth: Date;


}