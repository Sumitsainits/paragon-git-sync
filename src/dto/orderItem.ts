import { IsInt, IsString, Min } from 'class-validator';

export class LineItemDto {
  @IsString()
  groceryItemId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
