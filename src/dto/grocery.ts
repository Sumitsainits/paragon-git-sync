import { IsString, IsInt, Min, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGroceryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsInt()
  @Min(0)
  price: number;
}

export class UpdateGroceryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  price?: number;
}
