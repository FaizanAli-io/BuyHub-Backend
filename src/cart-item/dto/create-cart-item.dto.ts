import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;
}
