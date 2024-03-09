import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Grocery {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
