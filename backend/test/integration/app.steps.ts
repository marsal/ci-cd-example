import { After, Before } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { PrismaCounterRepository } from 'src/counter/infraestructure/prismaCounter.repository';
import { World } from './World';
import { InMemoryCounterRepository } from './inMemoryCounter.repository';
import { PrismaService } from 'src/common/prisma.service';

Before({ timeout: 10 * 1000 }, async function (this: World) {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider('CounterRepository')
    .useClass(InMemoryCounterRepository)
    .overrideProvider(PrismaCounterRepository)
    .useValue(null)
    .overrideProvider(PrismaService)
    .useValue(null)
    .compile();

  this.app = moduleFixture.createNestApplication();
  this.app.useLogger(false);

  await this.app.init();
});

After(async function (this: World) {
  await this.app?.close();
});
