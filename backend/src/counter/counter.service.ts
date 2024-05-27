import { Injectable } from '@nestjs/common';
import { CounterRepository } from './infraestructure/counter.repository';
import { Counter } from './counter.model';

@Injectable()
export class CounterService {
  constructor(private readonly repository: CounterRepository) {}
  async getCounter(): Promise<Counter> {
    const counter = await this.repository.get();
    if (!counter) {
      throw new Error('Counter not inicialized');
    }
    return counter;
  }

  async increaseCounter(id: number): Promise<Counter> {
    const counter = await this.repository.find(id);
    if (!counter) {
      throw new Error('Counter not found');
    }

    counter.count++;
    this.repository.update(counter);

    return counter;
  }

  async decreaseCounter(id: number): Promise<Counter> {
    const counter = await this.repository.find(id);
    if (!counter) {
      throw new Error('Counter not found');
    }

    counter.count--;
    this.repository.update(counter);
    return counter;
  }
}
