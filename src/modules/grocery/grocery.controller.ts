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
import { AdminAuthGuard } from 'src/guards/AdminAuthGuard';

@Controller('grocery')
export class GroceryController {
  constructor(private groceryService: GroceryService) {}

  @Post('item')
  @UseGuards(AdminAuthGuard)
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
  @UseGuards(AdminAuthGuard)
  async deleteGroceryItem(@Param('itemId') itemId: string) {
    return this.groceryService.deleteGroceryItem(itemId);
  }

  @Patch('item/:itemId')
  @UseGuards(AdminAuthGuard)
  async updateGroceryItem(@Param('itemId') itemId: string, @Body() dto: any) {
    return this.groceryService.updateGroceryItem(itemId, dto);
  }

  @Post('/orders')
  async createOrder(@Body() dto: any) {
    return this.groceryService.createOrder(dto);
  }
}
