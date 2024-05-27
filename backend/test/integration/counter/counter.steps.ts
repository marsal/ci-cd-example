import { Given, Then } from '@cucumber/cucumber';
import { World } from '../World';
import { InMemoryCounterRepository } from '../inMemoryCounter.repository';
import assert from 'node:assert';
import { Counter } from 'src/counter/counter.model';

Given('The database contains initial counter', async function (this: World) {
  const repository =
    await this.app.get<InMemoryCounterRepository>('CounterRepository');
  repository.fillRepo([{ id: 1, count: 0 }]);
});

Then(
  'el counter con id {int} debe haber sido persistido con los valores',
  async function (this: World, id: number, data: string) {
    const repository =
      await this.app.get<InMemoryCounterRepository>('CounterRepository');

    const counter = await repository.find(id);
    const expected: Counter = JSON.parse(data);
    assert.deepEqual(counter, expected);
  },
);
