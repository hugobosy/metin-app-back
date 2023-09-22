import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

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
