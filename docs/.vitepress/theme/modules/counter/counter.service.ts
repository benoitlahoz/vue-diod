import { Service } from 'diod';
import { AbstractLogger } from '../logger';
import { AbstractCounter } from './counter.abstract';

@Service()
export class Counter implements AbstractCounter {
  // Warning: Injected dependencies must be public.
  constructor(public readonly logger: AbstractLogger) {}

  public increment(value: number): number {
    const count = value + 1;
    this.logger.log(`In Counter: Count was %d and is now %d`, value, count);

    return count;
  }

  public decrement(value: number): number {
    const count = value - 1;
    this.logger.log(`In Counter: Count was %d and is now %d`, value, count);

    return count;
  }
}
