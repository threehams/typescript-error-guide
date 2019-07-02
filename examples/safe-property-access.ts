// Diagnostic codes: ts2339, ts2531, ts2532
import { get } from "lodash";
import { oc } from "ts-optchain";

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
  // the future, but this is in stage 1 and may change
  // const num = data?.mayExist?.deepMayExist?.nullableNumber ?? 0;
  // const num = data?.mayExist?.deepMayExist?.nullableFunction?.("bob") ?? 0;

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
  const something = get(
    data,
    ["mayExist", "deepMayExist", "nullableNumber"],
    0,
  );
  const notAnError = get(data, ["x", "y", "z"], "42");

  // full type safety and autocompletion. requires babel/ts plugin for
  // older browsers
  const numberWithDefault = oc(data).mayExist.deepMayExist.nullableNumber(0);
  const nullableNumber = oc(data).mayExist.deepMayExist.nullableNumber;
  const nullableFunction = oc(data).mayExist.deepMayExist.nullableFunction;
  const reversedByDefault = oc(data).mayExist.deepMayExist.nullableFunction(
    name => name,
  );
  // this catches properties which don't exist
  const intentionalError = oc(data).mayExist.fdsafdsavbfd.nullableNumber(0);
  // and the default value needs to match the possible values
  // (the error message could be better here)
  const badDefault = oc(data).mayExist.deepMayExist.nullableNumber("string");
};

interface StructureOne {
  deepMayExist?: {
    nullableString?: string | null | undefined;
    nullableNumber?: number | null | undefined;
    nullableArray?: string[] | null | undefined;
    nullableFunction?: ((name: string) => string) | string | null;
  };
}

// but note that type narrowing is still necessary for union types since
// there's no way for typescript to differentiate between unions
// without your help.

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
  oc(data).mayExist.somethingElse; // still can't just access properties that only exist on one

  // need to split it up
  const structure = oc(data).mayExist();
  if (!!structure && "deepMayExist" in structure) {
    oc(structure).deepMayExist.nullableNumber;
  }
  // or do a type assertion (unsafe)
  oc(structure as StructureOne).deepMayExist.nullableNumber(0);
};

// Destructuring with an empty object by default can result in confusing errors:
const doStuffWithDefaults = (data: UnreliableData) => {
  // "Initializer provides no value for this binding element and the binding element has no default value.ts(2525)"
  const { nullableString }: UnreliableData["mayExist"] = data.mayExist || {};
  // This will be fixed when TypeScript 3.6 is released.
};
