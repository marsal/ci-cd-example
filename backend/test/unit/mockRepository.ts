import { CounterRepository } from 'src/counter/infraestructure/counter.repository';

export const mockRepository: jest.Mocked<CounterRepository> = {
  find: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
};
