import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @CreateDateColumn()
  createdAt: Date;
}
