import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('revenues')
export class Revenues {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 36 })
  idUser: string;
  @Column({ length: 255 })
  item: string;
  @Column()
  count: number;
  @Column()
  priceYang: number;
  @Column()
  priceWon: number;
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'id' })
  user: User;
}
