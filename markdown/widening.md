# Type Widening (Quirk)

## Related Issues

- https://github.com/Microsoft/TypeScript/issues/10938#issuecomment-247476364
- https://github.com/microsoft/TypeScript/issues/20195
- https://twitter.com/kentcdodds/status/1081333326290415618

## Typical Problem

I've created an object with an exact string as one of its properties, like `"one"`. I took that and sent it to a function which expected the string to be `"one"`, and TypeScript is complaining that `Type 'string' is not assignable to type '"one"'`.

```tsx
type Options = {
  option: "one" | "two";
};
const doStuff = (options: Options) => {};

const options = {
  option: "one",
};
doStuff(options);
```

## Reason

JavaScript has mutable objects - anything can be changed at any time. Objects defined with `const` are still allowed to have values changed at runtime. Imagine if your code looked like this:

```tsx
const mutableOptions: Options = {
  option: "one",
};
// no error, but without widening, this would be:
// Type 'two' is not assignable to type '"one"'
mutableOptions.option = "two";
```

This would be _extremely annoying_ for any code which modified the object after creation. In JS, there is a lot of code like this.

## Fixing This Error

The easiest way to solve this is to avoid intermediate variables where possible. If TypeScript can figure everything out in a single expression, you won't hit this problem.

```tsx
doStuff({ option: "one" });
```

Of course, it's unrealistic to always put all your code on one line, so you'll still need a strategy when using one object literal in multiple places.

TypeScript 3.4 added "const assertions", which can mark any property, object, or array as immutable. Adding this will prevent the value from being widened.

```tsx
const singleConstOptions = {
  option: "one" as const,
};
// hey, no error!
doStuff(singleConstOptions);
```

You can set an entire object as immutable by adding `as const` to the whole object.

```tsx
const constOptions = {
  option: "one",
} as const;
// also good
doStuff(constOptions);
```

If you already know the type in advance, you can also just annotate with that. Here, we already know what `Options` should be, so let's use that!

```tsx
const annotatedOptions: Options = {
  option: "one",
};
// also good
doStuff(annotatedOptions);
```

## Gotchas

Arrays are special.

The TypeScript team is opposed to major breaking changes. This results in some strange tradeoffs. If an array is marked as `readonly`, you can't send a non-`readonly` array into it.

```tsx
type ImmutableStrings = readonly string[];

const mutateStrings = (strings: string[]) => {};

const dontMutateStrings = (strings: readonly string[]) => {};

declare const immutableStrings: ImmutableStrings;
declare const mutableStrings: string[];

// can't send a readonly array into anything accepting non-readonly
mutateStrings(immutableStrings);
// non-readonly into non-readonly is fine
mutateStrings(mutableStrings);
// readonly and non-readonly are fine into readonly
dontMutateStrings(immutableStrings);
dontMutateStrings(mutableStrings);
```

This does _not_ apply to properties on objects which are not arrays or tuples, despite that the same risk applies here. This is because the scale of the breaking change was much worse with properties when compared to arrays or tuples. See: https://github.com/Microsoft/TypeScript/pull/6532#issuecomment-174356151

```tsx
type ImmutableObject = {
  readonly name: string;
};
type MutableObject = {
  name: string;
};
declare const immutableObject: ImmutableObject;
declare const mutableObject: MutableObject;
const mutateObject = (obj: MutableObject) => {
  obj.name = "something else!";
};

mutateObject(mutableObject);
// surprise! readonly constraint breaks here
mutateObject(immutableObject);
```
