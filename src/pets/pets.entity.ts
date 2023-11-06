import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pets')
export class Pets {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ length: 20 })
  name: string;
}
