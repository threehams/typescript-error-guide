The `never` type is a condition which should never happen. This most commonly happens when a function throws an error, or when if/else/switch/case runs out of options and hits an `else` or `default` case.

```tsx
function fn(x: string | number): string {
  if (typeof x === "string") {
    return x;
  } else if (typeof x === "number") {
    return x.toString();
  }
}
```

Functions which throw will always have a `never` return type.

```tsx
function fail(msg: string): never {
  throw new Error(msg);
}
```

The other time you'll see `never` is when creating a new empty array, when
noImplicityAny is set to `false`. It is unlikely you will see this, but the
type defaults to `never[]` to prevent it from being inferred as `any[]`.
Simple fix: give it a type, or set `noImplicitAny` to true.
https://github.com/microsoft/TypeScript/pull/8944

Sometimes `never[]` is really a symptom of another error. Here's a case where
an object is

```tsx
type Resolver = {
  location: { city: string; state: string };
};

const resolver: Resolver = {
  location: [],
};
```

## References

[https://microsoft.github.io/TypeScript-New-Handbook/chapters/more-on-functions/#never](Never Type)
