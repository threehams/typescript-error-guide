## Diagnostic Codes

ts2339, ts2531, ts2532

## Safely Accessing Properties on Objects

```tsx
declare const get: (
  obj: any,
  path: string | number | symbol,
  defaultValue?: any,
) => any;

// go over: long vs. concise ways of dealing with deeply nested objects with conditionals
interface UnreliableData {
  mayExist?: {
    deepMayExist?: {
      nullableString?: string | null | undefined;
      nullableNumber?: number | null | undefined;
      nullableArray?: string[] | null | undefined;
      nullableFunction?: (name: string) => string | null;
    };
  };
}

const doStuff = (data?: UnreliableData) => {
  // error: any nulls will cause runtime errors
  const unsafeNum = data.mayExist.deepMayExist.nullableNumber;

  // this is correct (falsy check on object, type check on primitive), but awful
  const num =
    (data &&
      data.mayExist &&
      data.mayExist.deepMayExist &&
      typeof data.mayExist.deepMayExist.nullableNumber === "number" &&
      data.mayExist.deepMayExist.nullableNumber) ||
    0;

  // option 1: lodash get (or similar)
  // returns "any" and doesn't check any properties
  const something = get(data, "mayExist.deepMayExist.nullableNumber", 0);
  const notAnError = get(data, "x.y.z", "42");

  // full type safety and autocompletion
  const numberWithDefault = data?.mayExist?.deepMayExist?.nullableNumber ?? 0;
  const nullableNumber = data?.mayExist?.deepMayExist?.nullableNumber ?? 0;
  const nullableFunction = data?.mayExist?.deepMayExist?.nullableFunction?.("");

  // this catches properties which don't exist
  const intentionalError = data?.mayExist?.fdsafdsavbfd?.nullableNumber ?? 0;
  // and the default value needs to match the possible values
  // (the error message could be better here)
  const badDefault: number =
    data?.mayExist?.deepMayExist?.nullableNumber ?? "string";
};
```

but note that type narrowing is still necessary for union types since
there's no way for typescript to differentiate between unions
without your help.

```tsx
interface StructureOne {
  deepMayExist?: {
    nullableString?: string | null | undefined;
    nullableNumber?: number | null | undefined;
    nullableArray?: string[] | null | undefined;
    nullableFunction?: ((name: string) => string) | string | null;
  };
}

interface StructureTwo {
  somethingElse?: {
    one: string;
    two?: number;
  };
}

interface UnreliableUnionData {
  mayExist?: StructureOne | StructureTwo;
}

const doStuffWithUnions = (data?: UnreliableUnionData) => {
  data?.mayExist.somethingElse; // still can't just access properties that only exist on one

  // need to split it up
  const structure = data?.mayExist;
  if (!!structure && "deepMayExist" in structure) {
    structure?.deepMayExist.nullableNumber;
  }
  // or do a type assertion (unsafe)
  (structure as StructureOne)?.deepMayExist.nullableNumber ?? 0;
};

const doStuffWithDefaults = (data: UnreliableData) => {
  const { deepMayExist } = data.mayExist || {};
};
```
