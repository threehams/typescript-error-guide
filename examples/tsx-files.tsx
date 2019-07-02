// If you're using .tsx files (TypeScript React), and you're using a syntax
// where angle brackets appear before a type, TypeScript needs a bit of extra
// help to distinguish JSX from type parameters.

// See: generics.ts

() => {
  // The first case this can happen is when defining a generic function inline:

  // uncomment this block to see syntax error
  // const identity = <T>(item: T): T => {
  //   return item;
  // }

  // Adding `extends any` works. This doesn't force the parameter to `any` - it
  // just allows anything to be used as a parameter. See: bounded-type-parameters.ts
  const identity = <T extends any>(item: T): T => {
    return item;
  };

  // The following is fine, as JSX wouldn't be valid here:
  identity<string>("hi");

  // Same here:
  type RouterLocation<TQuery> = Location & { query: TQuery };
  let routerLocation: RouterLocation<{ referrer: string }>;
};

() => {
  // The second case is when using an older style of type assertions:

  // uncomment to see syntax error
  // const untypedLocation = <any>window.location;

  // To fix, just use the newer `as` keyword, which is nicer to read anyway:
  const anyLocation = location as any;
};
