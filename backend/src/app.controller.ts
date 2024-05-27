import { Controller, Get, Param } from '@nestjs/common';
import { Counter } from './counter/counter.model';
import { CounterService } from './counter/counter.service';

@Controller()
export class AppController {
  @Get('/isAlive')
  async isAlive() {
    return true;
  }
}
