import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({length: 30})
    nick: string;
    @Column({length: 120})
    email: string;
    @Column()
    password: string;
    @Column({default: false})
    isActive: boolean;
}

@Entity('users-confirm-code')
export class UserConfirmCode {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({length: 36})
    userID: string;
    @Column({length: 36})
    code: string;
}