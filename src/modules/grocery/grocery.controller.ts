import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { AdminAuthGuard } from '../../guards/AdminAuthGuard';
import { CreateGroceryDto, UpdateGroceryDto } from '../../dto/grocery';
import { CreateOrderDto } from '../../dto/order';

@Controller('grocery')
export class GroceryController {
  constructor(private groceryService: GroceryService) {}

  @Post('item')
  @UseGuards(AdminAuthGuard)
  async createGroceryItem(@Body() dto: CreateGroceryDto) {
    return this.groceryService.createGroceryItem(dto);
  }

  @Get('items')
  async getAllGroceryItems(
    @Query('includeSoldOutItems') includeSoldOutItems?: string,
  ) {
    return this.groceryService.getAllGroceryItems(
      includeSoldOutItems === 'true',
    );
  }

  @Delete('item/:itemId')
  @UseGuards(AdminAuthGuard)
  async deleteGroceryItem(@Param('itemId') itemId: string) {
    return this.groceryService.deleteGroceryItem(itemId);
  }

  @Patch('item/:itemId')
  @UseGuards(AdminAuthGuard)
  async updateGroceryItem(
    @Param('itemId') itemId: string,
    @Body() dto: UpdateGroceryDto,
  ) {
    return this.groceryService.updateGroceryItem(itemId, dto);
  }

  @Post('/orders')
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.groceryService.createOrder(dto);
  }
}
