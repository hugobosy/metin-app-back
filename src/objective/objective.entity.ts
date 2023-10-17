import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Objective {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 36 })
  idUser: string;
  @Column({ length: 255 })
  objective: string;
  @Column()
  amount: number;
}
