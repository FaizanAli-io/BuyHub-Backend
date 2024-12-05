import { Role, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const authToken = this.databaseService.generateAuthToken(32);
    const rightNow = this.databaseService.getCurrentDate();

    return this.databaseService.createEntity('User', {
      ...createUserDto,
      createdAt: rightNow,
      updatedAt: rightNow,
      balance: 5000,
      authToken,
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const users = await this.findAll();
    const { email, password } = loginUserDto;

    const user = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (user) return user;
    else return false;
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.databaseService.updateEntity('User', id, updateUserDto);
  }

  async remove(id: number): Promise<User | null> {
    return this.databaseService.deleteEntity('User', id);
  }

  async verifyAdmin(id: number): Promise<boolean> {
    return this.verifyUser(id, Role.ADMIN);
  }

  async verifySeller(id: number): Promise<boolean> {
    return this.verifyUser(id, Role.SELLER);
  }

  async verifyBuyer(id: number): Promise<boolean> {
    return this.verifyUser(id, Role.BUYER);
  }

  async verifyUser(id: number, role: Role): Promise<boolean> {
    const user = await this.findOne(id);
    return user.role == role;
  }
}
