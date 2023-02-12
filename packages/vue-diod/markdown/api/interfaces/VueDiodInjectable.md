# Interface: VueDiodInjectable

The definition of a couple abstraction / service to be
injected through DIOD.

## Properties

### dependencies

• `Optional` **dependencies**: `Abstract`<`unknown`\>[]

Disable autowiring by passing dependencies.

**`See`**

https://github.com/artberri/diod/blob/main/docs/disable-autowire.md

___

### private

• `Optional` **private**: `boolean`

Mark the dependency as private: It will not be callable by the container,
thus not injected in Vue via 'provide' method, but will serve only as
dependency for other injected classes.

___

### register

• **register**: `Abstract`<`unknown`\> \| `Newable`<`unknown`\>

The abstraction or concrete implementation
to pass to Diod to register a service.

___

### scope

• `Optional` **scope**: [`VueDiodScope`](../enums/VueDiodScope.md)

Scope of the dependency.

___

### tag

• `Optional` **tag**: `string`

Tag for the dependency.

**`See`**

https://github.com/artberri/diod/blob/main/docs/tagging.md

___

### token

• `Optional` **token**: `string` \| `boolean` \| `symbol`

Use a token to find dependency.
In case token property is a boolean, token will be set to the
abstract class name.

___

### use

• `Optional` **use**: `Newable`<`any`\>

The service implementation to use.

___

### useFactory

• `Optional` **useFactory**: `Factory`<`unknown`\>

The factory function to build instance.

**`See`**

https://github.com/artberri/diod/blob/main/docs/factories.md

___

### useInstance

• `Optional` **useInstance**: `Object`

The instance to use as dependency.

**`See`**

https://github.com/artberri/diod/blob/main/docs/instances.md
