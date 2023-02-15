import type { Ref } from 'vue';
import { ref } from 'vue';
import { Service } from 'diod';
import { LocalStorageUseCase } from './local-storage.abstract';
import { FileSaveUseCase } from '../file-save';

const DEFAULT_KEY_PREFIX: string = 'vue-diod';

@Service()
export class LocalStorage implements LocalStorageUseCase {
  private _prefix: string = DEFAULT_KEY_PREFIX;
  private _content: Ref<Record<string, string | number>> = ref({});

  constructor(prefix: string) {
    this._prefix = prefix;

    // Get local storage and set values in content object without the prefix.

    this._content.value = Object.keys(localStorage)

      // Filter by keys that begin with our prefix.

      .filter((key) => key.startsWith(this._prefix))
      .reduce((obj, key) => {
        // Get localStorage value.
        const stored = localStorage[key];

        // Check if the value is a number.
        const isNumber =
          !isNaN(+stored) && !isNaN(parseFloat(stored as string));

        // The value that we will store in our content object.
        const value = isNumber ? +localStorage[key] : localStorage[key];

        // Assign key/value to our content object.
        return Object.assign(obj, {
          [key.replace(`${this._prefix}:`, '')]: value,
        });
      }, {});
  }

  public set(key: string | symbol, value: string | number): void {
    const storageKey = `${this._prefix}:${String(key)}`;

    // Store with the prefix.
    localStorage.setItem(storageKey, String(value));

    // Check if value is a number.
    const isNumber = !isNaN(+value) && !isNaN(parseFloat(value as string));

    // Cache without the prefix.
    this._content.value[String(key)] = isNumber ? +value : value;

    // Order object by keys.
    this._content.value = Object.keys(this._content.value)
      .sort((keyA: string, keyB: string) =>
        keyA.toLowerCase().localeCompare(keyB.toLowerCase())
      )
      .reduce((obj: Record<string, any>, key: string) => {
        obj[key] = this._content.value[key];
        return obj;
      }, {});
  }

  public get(key: string | symbol): Record<string, any> | undefined {
    if (!this._content.value[String(key)]) return;

    // Return our content object's value.

    return {
      key: key,
      value: this._content.value[String(key)],
    };
  }

  public remove(key: string | symbol): void {
    const storageKey = `${this._prefix}:${String(key)}`;

    // Remove item with its prefix.
    localStorage.removeItem(storageKey);

    if (this._content.value[String(key)])
      // Remove item that was stored without the prefix in our content object.
      delete this._content.value[String(key)];
  }

  public save(fileSaver?: FileSaveUseCase): void {
    if (fileSaver) {
      const content = {
        prefix: this._prefix,
        content: {
          ...this._content.value,
        },
      };
      fileSaver.save(content);
    }
  }

  public get prefix(): string {
    return this._prefix;
  }

  public get content(): Ref<Record<string, any>> {
    return this._content;
  }
}
