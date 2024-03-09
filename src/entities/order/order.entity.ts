import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItems } from '../orderItems';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  customerName: string;

  @Column()
  orderTotal: number;

  @OneToMany(() => OrderItems, (orderItem) => orderItem.orderId)
  orderItems: OrderItems[];
}
