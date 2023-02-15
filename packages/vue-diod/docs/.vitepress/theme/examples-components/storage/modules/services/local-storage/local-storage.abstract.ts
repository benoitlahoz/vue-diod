import type { Ref } from 'vue';
import { StorageUseCase } from '../../domain/storage.abstract';
import { FileSaveUseCase } from '../file-save';

export abstract class LocalStorageUseCase extends StorageUseCase {
  public abstract prefix: string;
  public abstract content: Ref<Record<string, string | number>>;

  public abstract set(key: string | symbol, value: any): void;
  public abstract get(key: string | symbol): Record<string, any> | undefined;
  public abstract remove(key: string | symbol): void;

  public abstract save(fileSaver?: FileSaveUseCase): void;
}
