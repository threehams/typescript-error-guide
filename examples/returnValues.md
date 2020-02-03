# Return Value Types (Concept)

go over: return values can be inferred, but the more complex
the function, the more you're going to want to specify them.

TypeScript isn't going to get the return value wrong...
but mistakes in the function will shift the error from
the function (where the bug is) to the rest of the code!

```tsx
// Simple functions don't
const add = (x: number, y: number) => {
  // return value is number
  return x + y;
};

const result = add(1, 2); // simple enough
```

```tsx
interface Person {
  firstName: string;
  lastName: string;
  address?: {
    address1?: string;
    address2?: string;
  };
}
const selectPerson = (person: Person) => {
  return {
    firstName: person.firstName,
    lastName: person.lastName,
    // next line was meant to be "address"
    location: person.address
      ? `${person.address.address1} ${person.address.address2}`
      : "",
  };
};
// error is now showing up here, but the bug is in the function
selectPerson({ firstName: "Jackson", lastName: "Diamond" }).address;
```

```tsx
interface Person {
  firstName: string;
  lastName: string;
  address?: {
    address1?: string;
    address2?: string;
  };
}
interface PersonLocation {
  firstName: string;
  lastName: string;
  address: string;
}
const selectPerson = (person: Person): PersonLocation => {
  return {
    firstName: person.firstName,
    lastName: person.lastName,
    // there, now the bug shows up in here instead
    location: person.address
      ? `${person.address.address1} ${person.address.address2}`
      : "",
  };
};
selectPerson({ firstName: "Jackson", lastName: "Diamond" }).address;
```
