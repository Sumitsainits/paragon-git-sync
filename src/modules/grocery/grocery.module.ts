import { Module } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grocery } from '../../entities/grocery';
import { Order } from '../../entities/order';
import { OrderItems } from '../../entities/orderItems';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery, Order, OrderItems])],
  controllers: [GroceryController],
  providers: [GroceryService],
})
export class GroceryModule {}
