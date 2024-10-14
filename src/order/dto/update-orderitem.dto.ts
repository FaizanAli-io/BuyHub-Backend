import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderItemDTO {
  @IsInt()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsInt()
  @IsOptional()
  productId?: number;

  @IsInt()
  @IsOptional()
  orderId?: number;
}
