import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Category, Product } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category | null> {
    return this.databaseService.createEntity('Category', createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.databaseService.findAllEntities('Category');
  }

  async findOne(id: number): Promise<Category | null> {
    return this.databaseService.findEntityById('Category', id);
  }

  async findProductsByCategoryId(categoryId: number): Promise<Product[]> {
    const query: string = `SELECT * FROM "Product" WHERE "categoryId" = ${categoryId}`;

    return this.databaseService.executeDQLQuery(query);
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category | null> {
    return this.databaseService.updateEntity('Category', id, updateCategoryDto);
  }

  async remove(id: number): Promise<Category | null> {
    return this.databaseService.deleteEntity('Category', id);
  }
}
