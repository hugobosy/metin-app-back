import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
