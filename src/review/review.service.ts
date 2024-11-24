import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review | null> {
    return this.databaseService.createEntity('Review', {
      ...createReviewDto,
      createdAt: this.databaseService.getCurrentDate(),
    });
  }

  async findAll(): Promise<Review[]> {
    return this.databaseService.findAllEntities('Review');
  }

  async findOne(id: number): Promise<Review | null> {
    return this.databaseService.findEntityById('Review', id);
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review | null> {
    return this.databaseService.updateEntity('Review', id, updateReviewDto);
  }

  async remove(id: number): Promise<Review | null> {
    return this.databaseService.deleteEntity('Review', id);
  }

  async findReviewsByUserId(userId: number): Promise<Review[]> {
    const query: string = `SELECT * FROM "Review" WHERE "userId" = ${userId}`;
    return this.databaseService.executeQuery(query);
  }

  async findReviewsByProductId(productId: number): Promise<Review[]> {
    const query: string = `SELECT * FROM "Review" WHERE "productId" = ${productId}`;
    return this.databaseService.executeQuery(query);
  }
}
