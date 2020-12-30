# Object.keys, Object.entries, Object.fromEntries (Tradeoff)

## How are Object.keys and Object.entries typed?

`Object.keys` returns `string[]`. `Object.entries` returns `[string, Value]` (where `Value` is a union of all possible values). This works fine most of the time. However, problems happens when you're trying to transfer values from object to another by key:

```tsx
export {};

type FormState = {
  name: string;
  email: string;
  termsAccepted: boolean;
};
type FieldValidation = {
  name: boolean;
  email: string;
  termsAccepted: boolean;
};

declare const formState: FormState;
declare const fieldValidation: FieldValidation;
const valid = Object.keys(formState).forEach(key => {
  fieldValidation[key] = !!formState[key];
});
```

This error is explained at [Index Signatures](/?path=/story/examples--index-signatures)

## Why is `key` typed as `string` instead of `"name" | "age" | "termsAccepted"`?

Types in TypeScript are allowed to have extra properties. See: [Excess Property Checking](/?path=/story/examples--excess-property-checking).

With this in mind, typing `key` as only the _known_ keys can cause really unexpected results since you'll also be working with all the unknown ones. Here, we'll take in a `name` and `email` and use a type assertion to force the type to be `keyof FormState`:

```tsx
export {};

type FormState = {
  name: string;
  email: string;
};
type FieldValidation = {
  name: boolean;
  email: boolean;
  authenticated: boolean;
};

declare const fieldValidation: FieldValidation;

const userForm = {
  name: "Bob Johnson",
  email: "bobjohnson@example.com",
  authenticated: true, // extra properties are allowed
};
const validate = (formState: FormState) => {
  Object.keys(formState).forEach(keyArg => {
    const key = keyArg as keyof FormState;
    // We've unexpectedly overwritten authenticated to be `true` here
    fieldValidation[key] = !!formState[key];
  });
};
validate(userForm);
```

We've just validated someone as `authenticated` when they shouldn't be. This type of bug can be very difficult to track down.

## How likely is this to be a problem?

This is completely dependent on your project. Look at where you're using `Object.keys` or `Object.entries` and try to think of ways you could end up in bad situations if extra properties are present.

## How can I avoid this?

1. Consider if you should really be using an array instead of an object. This only works if you control the structure of the data, but arrays were made for iteration and preserving order.

2. Reconsider whether iteration is even valuable. The above example written without `Object.keys` avoids any type or runtime issues:

```tsx
export {};

type FormState = {
  name: string;
  email: string;
};
type FieldValidation = {
  name: boolean;
  email: boolean;
  authenticated: boolean;
};

declare const fieldValidation: FieldValidation;

const userForm = {
  name: "Bob Johnson",
  email: "bobjohnson@example.com",
  authenticated: true, // extra properties are OK here
};
const validate = (formState: FormState) => {
  fieldValidation.name = !!formState.name;
  fieldValidation.email = !!formState.email;
};
validate(userForm);
```

3. Accept `{ [key: string]: unknown }` in functions, which will force some extra checks for values, especially `null` and `undefined`.

## OK, I understand the risks. What if I want to just accept them and move on?

To opt in to riskier but more convenient types case-by-case:

```tsx
export {};

const exactKeys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];
const exactEntries = Object.entries as <
  T extends { [key: string]: any },
  K extends keyof T
>(
  o: T,
) => [keyof T, T[K]][];
type ValueOf<T> = T[keyof T];
const exactValues = Object.values as <T extends { [key: string]: any }>(
  o: T,
) => ValueOf<T>[];
```

To overwrite built-in definitions, making this behavior always apply:

```
type ValueOf<T> = T[keyof T];

declare global {
  interface ObjectConstructor {
    // keys: <T>(o: T) => Array<Extract<keyof T, string>>;
    keys<T>(o: T): Array<Extract<keyof T, string>>;
    entries<T extends { [key: string]: unknown }, K extends keyof T>(
      o: T,
    ): Array<[Extract<keyof T, string>, T[K]]>;
    values<T extends { [key: string]: any }>(
      o: T,
    ): ValueOf<T>[]
  }
}
```

## Object.values

`Object.values` implicitly returns `any` when used on an interface or type without an index signature.

```tsx
interface Person {
  name: string;
}
const stringifyValues = (person: Person) => {
  Object.values(person).map(value => value.toString());
};
const person = {
  name: "Blast Hardpeck",
  authenticated: null,
};
stringifyValues(person); // crash on null.toString();
```

## Object.fromEntries

The current definition for `Object.fromEntries` has an open issue at [#35745](https://github.com/microsoft/TypeScript/issues/35745). To opt in to more specific types when possible, add this to a `.d.ts` file in your project:

```
type UnionToIntersection<T> = (T extends T
? (p: T) => void
: never) extends (p: infer U) => void
  ? U
  : never;
type FromEntries<T extends readonly [PropertyKey, any]> = T extends T
  ? Record<T[0], T[1]>
  : never;
type Flatten<T> = {} & {
  [P in keyof T]: T[P];
};

declare global {
  interface ObjectConstructor {
    fromEntries<
      V extends PropertyKey,
      T extends [readonly [V, any]] | Array<readonly [V, any]>
    >(
      entries: T,
    ): Flatten<UnionToIntersection<FromEntries<T[number]>>>;
  }
}
```

`Object.fromEntries` works with tuples, so you'll likely need to use `as const` to mark your return value as a tuple rather than an array.

```tsx
export {};

declare const people: Array<{ name: string; age: number }>;
const ageMap = Object.fromEntries(
  people.map(person => {
    return [person.name, person.age] as const;
  }),
);
```
