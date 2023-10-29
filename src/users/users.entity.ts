import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Revenues } from '../revenues/revenues.entity';
import { Expenses } from '../expenses/expenses.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 30 })
  nick: string;
  @Column({ length: 120 })
  email: string;
  @Column()
  password: string;
  @Column({ default: false })
  isActive: boolean;
  @OneToMany(() => Revenues, (revenues) => revenues.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'idUser' })
  revenues: Revenues[];
  @OneToMany(() => Expenses, (expenses) => expenses.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'idUser' })
  expenses: Expenses[];
}

@Entity('users-confirm-code')
export class UserConfirmCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 36 })
  userID: string;
  @Column({ length: 36 })
  code: string;
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userID', referencedColumnName: 'id' })
  user: User;
}

@Entity('user-balance')
export class UserBalance {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 36 })
  userID: string;
  @Column({ default: 0 })
  balanceWon: number;
  @Column({ default: 0, type: 'bigint' })
  balanceYang: number;
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userID', referencedColumnName: 'id' })
  user: User;
}
