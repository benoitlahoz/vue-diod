---
title: Introduction
---

# {{ $frontmatter.title }}

Here we will build a component that will allow a `Client` to store data in her
browser's local storage, to get it back while preserving data
type (`string` or `number`) and to save it to a local file.

To keep the different parts of our application decoupled, we will first define
**abstractions** that expose the functionalities we want to
implement (**use cases**). Then, our component will bind these abstractions
with some implementations, which will be consumed by its children components
only knowing about the abstrations.

Each child will `inject` given implementation by calling the abstraction as key.
This will allow us to change implementation at main component level, without
any modification of the children code.

At the end, we will be able to **compose** our main component with children
being using the provided implementations.
