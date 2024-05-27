import { Module } from '@nestjs/common';
import { SharedModule } from 'src/common/shared.module';
import { CounterService } from './counter.service';
import { CounterRepository } from './infraestructure/counter.repository';
import { PrismaCounterRepository } from './infraestructure/prismaCounter.repository';
import { PrismaService } from 'src/common/prisma.service';
import { CounterController } from './counter.controller';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: CounterService,
      useFactory: (repository: CounterRepository): CounterService =>
        new CounterService(repository),
      inject: ['CounterRepository'],
    },
    {
      provide: 'CounterRepository',
      useExisting: PrismaCounterRepository,
    },
    {
      provide: PrismaCounterRepository,
      useFactory: (client: PrismaService): PrismaCounterRepository =>
        new PrismaCounterRepository(client),
      inject: [PrismaService],
    },
  ],
  controllers: [CounterController],
})
export class CounterModule {}
