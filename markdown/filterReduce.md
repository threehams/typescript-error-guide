# Filter and Reduce (Tradeoff)

## Related Issues

[Tradeoffs in Control Flow Analysis](https://github.com/Microsoft/TypeScript/issues/9998)

[Poor type inference for reduce for object](https://github.com/Microsoft/TypeScript/issues/25454)

```tsx
function toStrings(arr: object[]): string[] {
  return arr.reduce((acc, obj) => {
    acc.push(obj.toString());
    return acc;
  }, [] as string[]);
}

// for dictionaries, this is fine
const arr = [1, 2];
arr.reduce((acc, obj) => {
  acc[obj] = true;
  return acc;
}, {});

// for objects with known properties, you can't initialize the object
// see: build-up-object (type assertions)
interface User {
  name: string;
  phone: string;
}
const fields = [
  { name: "name", value: "bob" },
  { name: "phone", value: "8005552000" },
] as const;

fields.reduce<User>((acc, field) => {
  acc[field.name] = field.value;
  return acc;
  // error: can't initialize because "name" and "phone" are required
}, {});

arr.reduce((acc, obj) => {
  // error: No index signature with a parameter of type 'number' was found on type '{}'
  acc[obj] = true;
  return acc;
}, {});

const arrayWithNulls = [1, 2, null];
// filter is a type guard = needs to explictly know how to remove the union
const stillHasNulls: number[] = arrayWithNulls.filter(x => !!x);
const withoutNulls: number[] = arrayWithNulls.filter(
  (x): x is number => x !== null,
);

// since this is tedious, and boolean cast wipes out 0 and "" anyway:
const filterNulls = Array.prototype.filter(item => item != null);
const noNulls: number[] = arrayWithNulls.filter(filterNulls);
```
