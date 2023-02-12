# VueDiod - v0.0.6

## Enumerations

- [VueDiodScope](enums/VueDiodScope.md)

## Classes

- [VueDiodBuilder](classes/VueDiodBuilder.md)

## Interfaces

- [VueDiodConfiguration](interfaces/VueDiodConfiguration.md)
- [VueDiodInjectable](interfaces/VueDiodInjectable.md)

## Variables

### default

• `Const` **default**: `Object`

#### Type declaration

| Name      | Type                                                                                                     |
| :-------- | :------------------------------------------------------------------------------------------------------- |
| `install` | (`app`: `App`<`any`\>, `config`: [`VueDiodConfiguration`](interfaces/VueDiodConfiguration.md)) => `void` |

## Functions

### useDiod

▸ **useDiod**(): `Object`

#### Returns

`Object`

| Name                   | Type                                                  |
| :--------------------- | :---------------------------------------------------- |
| `getDefaultContainer`  | () => `undefined` \| `Container`                      |
| `injectionKeyForClass` | <T\>(`registered`: `unknown`) => `InjectionKey`<`T`\> |
