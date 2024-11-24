import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;
}
