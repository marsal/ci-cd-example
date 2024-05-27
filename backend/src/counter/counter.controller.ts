import { Controller, Get, Param } from '@nestjs/common';
import { Counter } from './counter.model';
import { CounterService } from './counter.service';

@Controller()
export class CounterController {
  constructor(private readonly service: CounterService) {}

  @Get('/counter')
  async getCounter(): Promise<Counter> {
    const counter = await this.service.getCounter();
    return counter;
  }

  @Get('/counter/:id/increase')
  async increaseCounter(@Param('id') id: number): Promise<Counter> {
    const counter = await this.service.increaseCounter(Number(id));
    return counter;
  }

  @Get('/counter/:id/decrease')
  async decreaseCounter(@Param('id') id: number): Promise<Counter> {
    const counter = await this.service.decreaseCounter(Number(id));
    return counter;
  }
}
