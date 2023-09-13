import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({length: 30})
    nick: string;
    @Column({length: 120, unique: true})
    email: string;
    @Column()
    password: string;
    @Column({default: false})
    isActive: boolean;
}