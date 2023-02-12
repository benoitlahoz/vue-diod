import { Service } from 'diod';
import { AbstractLogger } from './logger.abstract';

@Service()
export class Logger implements AbstractLogger {
  // See: https://stackoverflow.com/a/35715575
  // See: https://stackoverflow.com/a/42449998

  public log(...args: any[]): void {
    console.log(
      `\x1b[40m\x1b[1m LOG \x1b[0m ${args[0]}`,
      ...args.slice(1, args.length)
    );
  }

  public info(...args: any[]): void {
    console.log(
      `\x1b[44m\x1b[1m\x1b[30m INFO \x1b[0m ${args[0]}`,
      ...args.slice(1, args.length)
    );
  }

  public warn(...args: any[]): void {
    console.log(
      `\x1b[1m\x1b[43m\x1b[30m WARN \x1b[0m ${args[0]}`,
      ...args.slice(1, args.length)
    );
  }

  public error(...args: any[]): void {
    console.log(
      `\x1b[41m\x1b[1m\x1b[30m ERR \x1b[0m ${args[0]}`,
      ...args.slice(1, args.length)
    );
  }
}
