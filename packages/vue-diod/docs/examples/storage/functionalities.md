---
title: Functionalities
---

# {{ $frontmatter.title }}

On the base of our [User Stories](user-stories.md) we can now define the
functionalities we will have to implement.

::: warning
For the sake of not overengineering our example, we will keep functionalities in
concrete class methods, but we could also create a specific **use case** service
for each functionality.
:::

## Store

- **US1**: We can use browser's `localStorage.setItem` for this purpose.

- **US2**: We can use browser's `localStorage.getItem`, but we'll have to
  provide a way to recognize data stored specifically by this
  application / page: maybe we can **prefix** the data's key with an unique string
  corresponding to our application.

- **US3**: We can use browser's `localStorage.removeItem`.

- **US4**: `localStorage` only stores `string`, we will have to implement an
  an adapter to convert `string` in `number` when the value is only a number.

- **US5**: In Vue.js context, we'll expose a reactive object as `Ref`.

## Save

- **US6**: We will have to transform the data so it can be written to a file,
  then create an hidden download link and trigger it. To use it locally, we
  can choose to write file in standard `JSON` format.

- **US7**: We can parse the current `Date` and set the file's name with
  this date.

## Let's go!

Let's now create the abstractions that will be implemented by our services:

- Store and retrieve data with reliable types.
- Save this data to a file.
