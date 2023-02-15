---
title: Save to File
---

# {{ $frontmatter.title }}

As stated, the [`FileStorageUseCase`](abstractions.md#file-save) implementation
will be injected at runtime as a
[visitor](https://refactoring.guru/design-patterns/visitor) of our
[`LocalStorageUseCase`](abstractions.md#local-storage) concrete instance.

All it has to do is to provide a `save` method that accepts a type that our
storage service can provide.

## save

The purpose of the `save` method is to get a content and

- Convert it to be writable to a file.
- Trigger an event for the `Client` browser to download our file.

But...

- **US6** states that the file must be usable locally: let's choose **JSON**
  for our file format.
- **US7** states that the file must be timestamped.
  Even if the file system
  provides a way to organize files by date, we will suppose that time must be
  readable at a first glance on the file's name.

So, we will have to provide internal methods to 'sanitize' our file saving and
to manage with the DOM (as stated in **US1** `Client` is acting from
her browser).

## Helper methods

### \_generateFileName

We will generate a filename with current date values. At the end, the filename
will look like e.g. `20230215-12.54.26.923.json`. To make this happen, we will
create a method to format the values returned by `Date` methods.

```typescript
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
```

### \_formatDateItem

This helper method simply add a `0` before 1 digit date value.

```typescript
private _formatDateItem(item: string | number): string {
  return ('0' + item).slice(-2);
}
```

### \_downloadContent

To download the content of our 'store' in a file, we provisionally transform
the DOM by generating a link that we trigger programmatically.

```typescript
private _downloadContent(content: string, filename: string): void {
  // Create a link.

  const downloadLink = document.createElement('a');

  // Setup the link to download our file.
  downloadLink.setAttribute('href', content);
  downloadLink.setAttribute('download', filename);

  document.body.appendChild(downloadLink); // Required for Firefox

  // Trigger the link.
  downloadLink.click();

  // Remove it from DOM.
  downloadLink.remove();
}
```

## Finally... save

As a result, our `save` function will call these private methods to build
and download a file with the content it has been provided.

```typescript
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
```
