import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('pets')
export class Pets {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 20 })
  name: string;
}

@Entity('users-pets')
export class UsersPets {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 36 })
  userId: string;
  @Column({ length: 36 })
  petId: string;
  @Column({ length: 20 })
  name: string;
  @Column()
  time: string;
  @Column()
  level: number;
  @Column()
  type: number;
  @Column()
  stats: string;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
  @ManyToOne(() => Pets, (pets) => pets.id)
  @JoinColumn({ name: 'petId', referencedColumnName: 'id' })
  pets: Pets;
}
