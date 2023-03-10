export abstract class AbstractLogger {
  public abstract log(...args: any[]): void;
  public abstract info(...args: any[]): void;
  public abstract warn(...args: any[]): void;
  public abstract error(...args: any[]): void;
}
