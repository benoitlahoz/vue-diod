export abstract class FileSaveUseCase {
  public abstract save(content: Record<string, any>): void;
}
