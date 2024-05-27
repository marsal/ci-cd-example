import { Injectable } from '@nestjs/common';
import { Counter } from '../counter.model';
import { CounterRepository } from './counter.repository';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class PrismaCounterRepository implements CounterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(id: number): Promise<Counter> {
    const result = await this.prisma.counter.findFirst({ where: { id } });
    return result;
  }
  async get(): Promise<Counter> {
    const result = await this.prisma.counter.findFirst();
    return result;
  }

  async update(entity: Counter): Promise<void> {
    const { id, count } = entity;
    await this.prisma.counter.update({
      where: {
        id,
      },
      data: { count },
    });
  }
}
