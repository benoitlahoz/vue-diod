export abstract class StorageUseCase {
  public abstract set(key: string | symbol, value: any): void;
  public abstract get(key: string | symbol): any;
  public abstract remove(key: string | symbol): void;
}
