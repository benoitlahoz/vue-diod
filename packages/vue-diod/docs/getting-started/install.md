---
title: Install
---

# {{ $frontmatter.title }}

## With npm or yarn

Considering **you already have a working vue 3 project**, you'll have
to install VueDiod with its dependencies:
[`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata)
and obviously [`diod`](https://www.npmjs.com/package/diod).

#### npm

```sh
npm install -s vue-diod diod reflect-metadata
```

#### yarn

```sh
yarn add vue-diod diod reflect-metadata
```

## Add properties to _tsconfig.json_

Modify your `tsconfig.json`to include the following settings:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```
