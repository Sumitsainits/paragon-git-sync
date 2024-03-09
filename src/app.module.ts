import { Module } from '@nestjs/common';
import { GroceryModule } from './grocery/grocery.module';

@Module({
  imports: [GroceryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
