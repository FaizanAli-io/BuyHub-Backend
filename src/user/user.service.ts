import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const authToken = this.databaseService.generateAuthToken(32);
    const createdAt = this.databaseService.getCurrentDate();
    const updatedAt = this.databaseService.getCurrentDate();

    return this.databaseService.createEntity('User', {
      ...createUserDto,
      authToken,
      createdAt,
      updatedAt,
    });
  }

  async findAll(role?: 'BUYER' | 'SELLER' | 'ADMIN'): Promise<User[]> {
    const users = await this.databaseService.findAllEntities('User');
    if (role) {
      return users.filter((user) => user.role === role);
    }
    return users;
  }

  async findOne(id: number): Promise<User | null> {
    return this.databaseService.findEntityById('User', id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    return this.databaseService.updateEntity('User', id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    return this.databaseService.deleteEntity('User', id);
  }
}
