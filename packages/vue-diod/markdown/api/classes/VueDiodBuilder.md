# Class: VueDiodBuilder

The VueDiod builder for injectables.

## Constructors

### constructor

• **new VueDiodBuilder**()

## Accessors

### container

• `get` **container**(): `undefined` \| `Container`

The native DIOD container for this instance.

**`See`**

https://github.com/artberri/diod/blob/main/docs/README.md

#### Returns

`undefined` \| `Container`

## Methods

### bootstrap

▸ **bootstrap**(`app`, `config`): `void`

Registers and use the couples abstraction / implementation to be injected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `App`<`any`\> |
| `config` | [`VueDiodConfiguration`](../interfaces/VueDiodConfiguration.md) |

#### Returns

`void`
