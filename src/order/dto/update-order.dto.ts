import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class UpdateOrderDto {
  @IsOptional()
  @IsInt()
  total?: number;

  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus;
}
