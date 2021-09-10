import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { Door } from "./Door";

@Entity("User")
export class User{
    @Column({
        primary : true,
        length: 20,
        comment: '카카오 회원 ID'
    })
    kakaoId: string;

    @Column({
        length: 20,
        comment: '이름'
    })
    name: string;

    @Column({
        type:"tinyint",
        comment: '성별 (남:1/여:0)'
    })
    gender: boolean;

    @Column({
        length: 13,
        comment: '전화번호(- 포함)'
    })
    phone: string;

    @Column({
        length: 3,
        comment: '혈액형'
    })
    bloodType: string;

    @Column({
        length: 100,
        comment: '주소'
    })
    address: string;

    @Column({
        length: 256,
        nullable: true,
        comment: '이메일'
    })
    email?: string;

    @Column({
        nullable: true,
        comment: '나이'
    })
    age?: number;

    @Column({
        length: 256,
        nullable: true,
        comment: '사진 경로'
    })
    imgSrc?: string;

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

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;

    //  FK AREA
    //  Door
    @ManyToOne(
        (type)=>Door,
        (door)=>door.user
    )
    door: Door
}
