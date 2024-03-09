import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Grocery } from '../entities/grocery';
import { In, MoreThan, Repository } from 'typeorm';
import { Order } from '../entities/order';
import { OrderItems } from '../entities/orderItems';

@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(Grocery)
    private readonly groceryRepo: Repository<Grocery>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItems)
    private readonly orderItemsRepo: Repository<OrderItems>,
  ) {}

  async createGroceryItem(dto: any) {
    const groceryItem = this.groceryRepo.create(dto);
    return this.groceryRepo.save(groceryItem);
  }

  async deleteGroceryItem(itemId: string) {
    const groceryItem = await this.groceryRepo.findOneBy({ id: itemId });
    if (!groceryItem) {
      throw new NotFoundException('Grocery item not found with given id.');
    }

    return this.groceryRepo.softDelete(itemId);
  }

  async updateGroceryItem(itemId: string, dto: any) {
    const groceryItem = await this.groceryRepo.findOneBy({ id: itemId });
    if (!groceryItem) {
      throw new NotFoundException('Grocery item not found with given id.');
    }

    return this.groceryRepo.update(itemId, dto);
  }

  async getAllGroceryItems(includeSoldOutItems: boolean = false) {
    return this.groceryRepo.find(
      includeSoldOutItems ? {} : { where: { quantity: MoreThan(0) } },
    );
  }

  async createOrder(dto: {
    customerName: string;
    lineItems: { groceryItemId: string; quantity: number }[];
  }) {
    let orderTotal: number = 0;

    const orderItems = await Promise.all(
      dto.lineItems.map(async (lineItem) => {
        const groceryItem = await this.groceryRepo.findOneBy({
          id: lineItem.groceryItemId,
        });
        if (!groceryItem) {
          throw new NotFoundException(
            `Grocery item with ID ${lineItem.groceryItemId} not found`,
          );
        }

        orderTotal += groceryItem.price * lineItem.quantity;

        return this.orderItemsRepo.create({
          ...lineItem,
          totalPrice: groceryItem.price * lineItem.quantity,
        });
      }),
    );

    const order = this.orderRepo.create({
      customerName: dto.customerName,
      orderTotal,
    });

    await this.orderRepo.save(order);
    await this.orderItemsRepo.save(orderItems);

    return { ...order, orderItems };
  }
}
