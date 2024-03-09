import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';

@Controller('grocery')
export class GroceryController {
  constructor(private groceryService: GroceryService) {}

  @Post('item')
  async createGroceryItem(@Body() dto: any) {
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
  async deleteGroceryItem(@Param('itemId') itemId: string) {
    return this.groceryService.deleteGroceryItem(itemId);
  }

  @Patch('item/:itemId')
  async updateGroceryItem(@Param('itemId') itemId: string, @Body() dto: any) {
    return this.groceryService.updateGroceryItem(itemId, dto);
  }

  @Post('/orders')
  async createOrder(@Body() dto: any) {
    return this.groceryService.createOrder(dto);
  }
}
