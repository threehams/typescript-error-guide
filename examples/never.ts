export {};
// The `never` type is a condition which should never happen.
// This most commonly happens when a function throws an error, or when if/else/switch/case
// runs out of options and hits an `else` or `default` case.

// from: https://microsoft.github.io/TypeScript-New-Handbook/chapters/more-on-functions/#never
function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}

function fail(msg: string): never {
  throw new Error(msg);
}

// The other time you'll see `never` is when creating a new empty array, when
// noImplicityAny is set to `false`. It is extremely unlikely you will see this,
// but the type defaults to `never[]` to prevent it from being inferred as `any[]`.
// Simple fix: give it a type, or set `noImplicitAny` to true.
// https://github.com/microsoft/TypeScript/pull/8944

const emptyArray = []; // never[]
emptyArray.push(1); // nope!
const emptyNumberArray: number[] = [];
