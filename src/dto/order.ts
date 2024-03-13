import {
  IsString,
  ArrayNotEmpty,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LineItemDto } from './orderItem';

export class CreateOrderDto {
  @IsString()
  customerName: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  lineItems: LineItemDto[];
}
