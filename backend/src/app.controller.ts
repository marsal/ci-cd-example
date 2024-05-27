import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/isAlive')
  async isAlive() {
    return true;
  }
}
