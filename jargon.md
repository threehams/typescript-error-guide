# Common Terms

## Structural Typing

## Subtype

In structural typing, a type which matches another type, but contains extra properties, is considered a subtype.
In TypeScript
Example:

```ts
const;
```

## Excess Property Checking

The

## Freshness

## Inference

## Invariant

## Type Parameter

Code which can be checked at runtime.

Type safe function:

```tsx
const;
```

## Type Safe

# Obscure Terms

## Covariant/Contravariant

# Really Obscure Terms

## Homomorphic

## Naked Type Parameter

A type parameter (see above) which is not wrapped in something like an array.

Example:

```ts
// T here is any element in the array
// T[] is the array itself
const filter = <T>(array: T[], func: (T): boolean): T[] => {}
```
