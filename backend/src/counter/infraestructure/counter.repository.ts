import { Counter } from '../counter.model';

export interface CounterRepository {
  find(id: number): Promise<Counter>;
  get(): Promise<Counter>;

  update(entity: Counter): Promise<void>;
}
