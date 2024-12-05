import { IsNotEmpty, IsNumber, IsString, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId?: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  quantity: number;
}
