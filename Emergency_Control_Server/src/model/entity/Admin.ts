import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany} from "typeorm";

@Entity("Admin")
export class Admin{
    @Column({
        primary : true,
        length: 15,
        comment: 'ID'
    })
    id: string;

    @Column({
        comment: '비밀번호',
        length: 20
    })
    password: string;

    @Column({
        comment: '이름',
        length: 20
    })
    name: string;
    
    @Column({
        comment: '권한',
        length: 20
    })
    authority: string;

    @Column({
        comment: '토큰',
        length: 256
    })
    token: string;
    
    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updateDate: Date;
}