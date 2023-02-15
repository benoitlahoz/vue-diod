import { Service } from 'diod';
import { AbstractCounter } from './counter.abstract';

@Service()
export class SimpleCounter implements AbstractCounter {
  public increment(value: number): number {
    const count = value + 1;
    return count;
  }

  public decrement(value: number): number {
    const count = value - 1;
    return count;
  }
}
