import { CounterService } from 'src/counter/counter.service';
import { mockRepository } from './mockRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { CounterRepository } from 'src/counter/infraestructure/counter.repository';
import { Counter } from 'src/counter/counter.model';

describe('Counter Service', () => {
  let service: CounterService;
  let counter: Counter;
  let counterId: number;

  const findSpy: jest.SpyInstance = jest.spyOn(mockRepository, 'find');

  const getSpy: jest.SpyInstance = jest.spyOn(mockRepository, 'get');

  const updateSpy: jest.SpyInstance = jest.spyOn(mockRepository, 'update');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CounterService,
          useFactory: (repository: CounterRepository): CounterService =>
            new CounterService(repository),
          inject: ['CounterRepository'],
        },
        {
          provide: 'CounterRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CounterService>(CounterService);
    counterId = 1;
    counter = { id: counterId, count: 0 };
  });
  afterEach(() => {
    findSpy.mockClear();
    getSpy.mockClear();
    updateSpy.mockClear();
  });

  it('debería devolver una instancia de counter 0', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(CounterService);
  });

  describe('GET COUNTER', () => {
    it('debería ejecutar y devolver un Counter inicializado', async () => {
      getSpy.mockReturnValue(Promise.resolve(counter));

      const result = await service.getCounter();

      expect(getSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(counter);
    });

    it('debería devolver error si el Counter no esta bien inicializado', async () => {
      getSpy.mockReturnValue(Promise.resolve(null));

      await expect(service.getCounter()).rejects.toThrow(
        'Counter not inicialized',
      );
    });
  });

  describe('INCREASE COUNTER', () => {
    it('debería ejecutar y devolver un Counter incrementado', async () => {
      const increasedCounter = { id: counterId, count: 1 };
      findSpy.mockReturnValue(Promise.resolve(counter));
      updateSpy.mockReturnValue(Promise.resolve());

      const result = await service.increaseCounter(counterId);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(counterId);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(increasedCounter);
      expect(result).toStrictEqual(increasedCounter);
    });

    it('debería devolver error si el Counter no esta presente en BBDD', async () => {
      findSpy.mockReturnValue(Promise.resolve(null));

      await expect(service.increaseCounter(counterId)).rejects.toThrow(
        'Counter not found',
      );
      expect(updateSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('DECREASE COUNTER', () => {
    it('debería ejecutar y devolver un Counter decrementado', async () => {
      const decreasedCounter = { id: counterId, count: -1 };
      findSpy.mockReturnValue(Promise.resolve(counter));
      updateSpy.mockReturnValue(Promise.resolve());

      const result = await service.decreaseCounter(counterId);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(counterId);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(decreasedCounter);
      expect(result).toStrictEqual(decreasedCounter);
    });

    it('debería devolver error si el Counter no esta presente en BBDD', async () => {
      findSpy.mockReturnValue(Promise.resolve(null));

      await expect(service.increaseCounter(counterId)).rejects.toThrow(
        'Counter not found',
      );
      expect(updateSpy).toHaveBeenCalledTimes(0);
    });
  });
});
