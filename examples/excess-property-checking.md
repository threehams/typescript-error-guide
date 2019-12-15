# Excess Property Checking

Excess Property Checking (abbreviated to EPC from here) is a system which detects
when extra properties are added to objects when it's likely a mistake, while still
allowing most object to contain extra properties for flexibility.

At its best, this allows you to reuse the same function with very different inputs,
as you define only the subset of data you need from an object. Most functions don't
have a problem accepting additional properties on objects.

At its worst, this is confusing or even unsafe at runtime.

Knowing how this works is very important.

## Open Types

All types are "open" or "inexact" in TypeScript. There currently are no
"closed" or "exact" types.

Here, the extra `age` property is not an error:

```tsx
const getName = (person: { name: string }) => {
  return person.name;
};

const person = {
  name: "Rock Rockman",
  age: "27", // extra property
};
getName(person); // no error
```

In many cases, this is an advantage - a function specifies what it wants from an object,
which allows a single object type to work with a range of possible data. This prevents us
from needing to narrow union types:

```tsx
const person1 = {
  name: "Morgan Stryker",
  active: true,
};
const person2 = {
  name: "Jackson Blacklock",
  phone: "818-555-2000",
};
getName(person1);
getName(person2);
```

However, problems happen with "options objects", common in JS:

```tsx
interface Options {
  firstName?: boolean;
  lastName?: boolean;
}
const getSplitName = (person: { name: string }, options: Options = {}) => {
  const [firstName, lastName] = person.name.split(" ");
  return {
    firstName: options.firstName ? firstName : null,
    lastName: options.lastName ? lastName : null,
    name: person.name,
  };
};

const options = {
  firstName: true,
  // "last" isn't a property, but no error is reported
  last: true,
};
getSplitName(person, options);
```

To prevent this from happening, TypeScript will report errors on extra properties
if the object is sent directly into a function/JSX element without being assigned
to a variable:

```tsx
getSplitName(person, { firstName: true, last: true }); // error!
```

## Rules of EPC

From the [pull request](https://github.com/Microsoft/TypeScript/pull/3823):

- Every object literal is initially considered "fresh".
- When a fresh object literal is assigned to a variable or passed for a parameter of a non-empty
  target type, it is an error for the object literal to specify properties that don't exist in the target type.
- Freshness disappears in a type assertion or when the type of an object literal is widened.

If you tend to assign single-use variables before use, you may not get the benefits of EPC automatically.
Where possible, it's safer and less verbose to inline options objects (or React component props) instead of
assigning to a variable first.

However, there are times where it makes sense, such as passing the same options / props into multiple functions
or components. You can opt-in to EPC here by defining a type on the object at the time of assignment:

```tsx
const nameOptions: Options = {
  firstName: true,
  last: true, // this is now checked
};
getSplitName(person, nameOptions);
```

## With Libraries

When using a library, a couple approaches may work. Most libraries will export type definitions
in addition to normal exports.

```tsx
import { debounce, DebounceSettings } from "lodash";

const settings: DebounceSettings = {
  maxWait: 30,
  lead: 30,
};
debounce(() => {}, 30, settings);
```

If they don't, you can still extract specific argument types using the `Parameters<>` utility. Note
that this is a last resort. For overloaded functions, the last signature defined is used. This can change from under you without warning!

```tsx
type DebounceOptions = Parameters<typeof debounce>;
const debounceSettings: DebounceOptions[2] = {
  maxWait: 4,
  lead: 30,
};

interface Overloaded {
  (x: number, y: number): string;
  (x: string): number;
}

interface ReversedOverloaded {
  (x: string): number;
  (x: number, y: number): string;
}

const param1: Parameters<Overloaded>[0] = 1;
const param2: Parameters<Overloaded>[0] = "string";
const reversedParam1: Parameters<ReversedOverloaded>[0] = 1;
const reversedParam2: Parameters<ReversedOverloaded>[0] = "string";
```
