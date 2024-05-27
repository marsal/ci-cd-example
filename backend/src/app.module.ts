import { Module } from '@nestjs/common';
import { CounterModule } from './counter/counter.module';
import { AppController } from './app.controller';

@Module({
  imports: [CounterModule],
  controllers: [AppController],
})
export class AppModule {}
