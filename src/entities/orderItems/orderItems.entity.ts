import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  groceryItemId: string;

  @Column()
  orderId: string;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;
}
