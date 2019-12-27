If you're using .tsx files (TypeScript React), and you're using a syntax
where angle brackets appear before a type, TypeScript needs a bit of extra
help to distinguish JSX from type parameters.

The first case this can happen is when defining a generic function inline:

```tsx
import React from "react";

const Button: React.FC = ({ children }) => {
  return <button>{children}</button>;
}

// uncomment this block to see syntax error
const identity = <T>(item: T): T => {
  return item;
};
```

Adding `extends any` works. This doesn't force the parameter to `any` - it
just allows anything to be used as a parameter. See: [Bounded Type Parameters](boundedTypeParameters).

```tsx
const identity = <T extends any>(item: T): T => {
  return item;
};

// The following is fine, as JSX wouldn't be valid here:
identity<string>("hi");

// Same here:
type RouterLocation<TQuery> = Location & { query: TQuery };
let routerLocation: RouterLocation<{ referrer: string }>;
```

The second case is when using an older style of type assertions. To fix, just use the newer `as` style.

```tsx
// uncomment to see syntax error
// const untypedLocation = <any>window.location;

const anyLocation = location as any;
```
