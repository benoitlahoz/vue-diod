import { Service } from 'diod';
import { AbstractLogger } from './logger.abstract';

@Service()
export class Logger implements AbstractLogger {
  public log(...args: any[]): void {
    console.log(...args);
  }
}
