import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsPositive,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  rating: number;

  @IsOptional()
  @IsString()
  content: string;
}
