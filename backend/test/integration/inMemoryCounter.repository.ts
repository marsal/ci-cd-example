import { Counter } from 'src/counter/counter.model';
import { CounterRepository } from 'src/counter/infraestructure/counter.repository';

export class InMemoryCounterRepository implements CounterRepository {
  private readonly counters: Map<number, Counter>;
  constructor() {
    this.counters = new Map<number, Counter>();
  }

  async getAll(): Promise<Counter[]> {
    return [...this.counters.values()];
  }
  async get(): Promise<Counter> {
    const counters = await this.getAll();
    return Promise.resolve(counters[0] || null);
  }

  async find(id: number): Promise<Counter | null> {
    const counter = this.counters.get(id) || null;
    return counter;
  }
  async update(counter: Counter): Promise<void> {
    const { id } = counter;
    this.counters.set(id, counter);
    return Promise.resolve();
  }

  fillRepo(counters: Counter[]): void {
    counters.forEach((counter) => {
      this.counters.set(counter.id, counter);
    });
  }
  clearRepo(): void {
    this.counters.clear();
  }
}
