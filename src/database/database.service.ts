import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async createEntity(table: string, data: Record<string, any>): Promise<any> {
    const keys: string = Object.keys(data)
      .map((value) => `"${value}"`)
      .join(', ');
    const values: string = Object.values(data)
      .map((value) => `'${value}'`)
      .join(', ');

    const query: string = `INSERT INTO "${table}" (${keys}) VALUES (${values}) RETURNING *`;
    const result: any[] = await this.$queryRawUnsafe(query);

    return result.length > 0 ? result[0] : null;
  }

  async findAllEntities(table: string): Promise<any[]> {
    const query: string = `SELECT * FROM "${table}"`;
    const result: any[] = await this.$queryRawUnsafe(query);

    return result;
  }

  async findEntityById(table: string, id: number): Promise<any> {
    const query: string = `SELECT * FROM "${table}" WHERE id = ${id}`;
    const result: any[] = await this.$queryRawUnsafe(query);

    return result.length > 0 ? result[0] : null;
  }

  async updateEntity(
    table: string,
    id: number,
    data: Record<string, any>,
  ): Promise<any> {
    const updates: string = Object.keys(data)
      .map((key) => `"${key}" = '${data[key]}'`)
      .join(', ');

    const query: string = `UPDATE "${table}" SET ${updates} WHERE id = ${id} RETURNING *`;
    const result: any = this.$queryRawUnsafe(query);

    return result;
  }

  async deleteEntity(table: string, id: number): Promise<any> {
    const query: string = `DELETE FROM "${table}" WHERE id = ${id} RETURNING *`;
    const result: any = this.$queryRawUnsafe(query);

    return result;
  }

  async executeDQLQuery(
    query: string,
    forOne: boolean = false,
  ): Promise<any[]> {
    const result: any[] = await this.$queryRawUnsafe(query);

    return forOne ? result[0] : result;
  }

  generateAuthToken(length: number = 32): string {
    return randomBytes(length).toString('hex').slice(0, length);
  }

  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
