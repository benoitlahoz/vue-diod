---
title: VueDiodBuilder
---

# {{ $frontmatter.title }}

`VueDiodBuilder` is the central object in Vue DIOD. Basically, it is a wrapper
around DIOD's builder, but it's also the place where registered dependencies
are bound to Vue.js `provide/inject` methods.

::: tip
Check the [configuration](../getting-started/configuration.md) section to read
how to configure the plugin for Vue injection of your dependencies.
:::

## Bootstrap from Plugin

When bootstrapping our application with `app.use(VueDiod, { ... })` Vue DIOD's
plugin creates a new builder and cache it in a private helper for further use.

This instance of VueDiodBuilder creates a dependencies container thanks to DIOD,
and setup app provided keys on top of the registered classes.

```typescript
// VueDiodBuilder provides a function that call DIOD's container 'get'.

app.provide(Key as InjectionKey<Abstract<typeof Key>>, () =>
  this._container.get(service.register)
);
```

### provide

The `VueDiodBuilder` handles all DIOD's functionalities (scopes, tags, ...) and
offers ways to call them from Vue components with Vue's `inject` method.

These bindings sometimes require conventions. An example is the `tag` option of
our configuration object.

Tagged services must be prefixed to be found when calling Vue's `inject` method.
The default prefix is... `tag`, that make possible to call tagged services _via_
`ìnject('tag:my.super.tag')`.
Vue DIOD allows to customize the prefix with `tagPrefix` global option
in builder's configuration.

At another level: It has to be noted that VueDiodBuilder's `provide` bindings
don't return the instance itself but, instead, return a function to get it.
By this way, we can rely on DIOD's scopes features to get what we configured:
singleton, transient or per-request instance of our dependency.

## Create in Component

New `VueDiodBuilder` instances can be created at component level or in custom
composables.

::: tip
See [Parent → Child](../examples/parent-child.md) for an example.
:::

The way to bootstrap the container is the same as at global level, but we have
to pass the current instance of the component we're creating the builder in.

```typescript
// Creates a new builder.

const builder = new VueDiodBuilder();

// Bootstraps the builder we just created,
// as in global plugin's configuration
// but on the component's instance.

builder.bootstrap({
  injectables: [
    {
      register: AbstractCounter, // This is what the children are waiting for.
      use: Counter, // This is what they will receive actually.
    },
  ],
});
```

Under the hood VueDiodBuilder uses the Vue's method `getCurrentInstance`
to call `provide` on it.

::: warning
`getCurrentInstance` seems to be a 'private' method in Vue. It is
possible that we'll have to replace it in a next release to get the
actual instance.
:::

To handle this Vue DIOD relies on a kind of **ugly hack**, by **munging**
the Vue's `ComponentInternalInstance` to add a `provide` function that
add entries to its `provides` (note the 's') object.

```typescript
component.provide = (
  key: string | InjectionKey<() => unknown>,
  value: () => unknown
) => {
  component.provides = {
    ...(component.provides || {}),
    [key as any]: value,
  };
};
```

But, once this is done, any child component can check if a dependency
is provided by using `isProvided` method of `useVueDiod` composable with
the registered identifier (abstract class) as key.

```typescript
const exists = isProvided(AbstractCounter);
```
