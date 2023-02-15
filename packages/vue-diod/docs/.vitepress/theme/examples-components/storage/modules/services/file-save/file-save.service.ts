import { Service } from 'diod';
import { FileSaveUseCase } from './file-save.abstract';

@Service()
export class FileSaver implements Partial<FileSaveUseCase> {
  public save(content: Record<string, any>): void {
    // Prepare file content.

    const fileContent = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(content, null, 2)
    )}`;

    // Prepare file name.

    const filename = this._generateFilename();

    // Download file.

    this._downloadContent(fileContent, filename);
  }

  private _downloadContent(content: string, filename: string): void {
    // See: https://stackoverflow.com/a/30800715

    const downloadLink = document.createElement('a');

    downloadLink.setAttribute('href', content);
    downloadLink.setAttribute('download', filename);

    document.body.appendChild(downloadLink); // Required for Firefox

    downloadLink.click();

    downloadLink.remove();
  }

  private _generateFilename(): string {
    const now = new Date();

    return (
      `${now.getFullYear()}` +
      `${this._formatDateItem(now.getMonth() + 1)}` +
      `${this._formatDateItem(now.getDate())}-` +
      `${this._formatDateItem(now.getHours())}.` +
      `${this._formatDateItem(now.getMinutes())}.` +
      `${this._formatDateItem(now.getSeconds())}.` +
      `${now.getMilliseconds()}` +
      `.json`
    );
  }

  private _formatDateItem(item: string | number): string {
    return ('0' + item).slice(-2);
  }
}
