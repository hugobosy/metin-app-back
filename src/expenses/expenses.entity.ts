import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('expenses')
export class Expenses {
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
  @Column({ default: 'expenses' })
  type: 'revenues' | 'expenses';
  @CreateDateColumn()
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'idUser', referencedColumnName: 'id' })
  user: User;
}
