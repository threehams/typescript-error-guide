export {};
// diagnostic codes: ts2339, ts2741

// possibly related: control flow analysis
// https://github.com/Microsoft/TypeScript/issues/9998

// Sometimes, you need to initialize an object and add properties
// one by one, often with a check each time.

interface Result {
  name?: string;
  value: string | number;
}

let buildResult;
buildResult = (name?: string) => {
  const result = {};
  // error, this property doesn't exist on {}
  if (name) {
    result.name = name;
  }
  result.value = 1;
};

buildResult = (name?: string) => {
  const result: Result = {}; // error, missing property "value"
  if (name) {
    result.name = name;
  }
  result.value = 1;
};

buildResult = (name?: string): Result => {
  const result = {} as Result;
  if (name) {
    result.name = name;
  }
  result.value = 1; // comment out this line: note, no error
  return result;
};

// for simple cases, just have two returns
buildResult = (name?: string): Result => {
  if (name) {
    return { name, value: 1 };
  }
  return { value: 1 };
};

// ...or redefine a variable
buildResult = (name?: string): Result => {
  let result: Result;
  if (name) {
    result = { name, value: 1 };
  } else {
    result = { value: 1 };
  }
  return result;
};

// or use a utility
const filterNulls = <T extends { [key: string]: any }, K>(
  obj: T
): { [K in keyof T]: T[K] extends any ? T[K] : null } => {
  return entries(obj).reduce(
    (acc, [key, value]) => {
      // == null matches null or undefined
      if (value != null) {
        acc[key] = value;
      }
      return acc;
    },
    {} as T
  );
};

buildResult = (name?: string): Result => {
  return filterNulls({
    name: name,
    value: 1
  });
};

// remember keys + entries and open types:
// https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
const keys = Object.keys as <T>(o: T) => (Extract<keyof T, string>)[];
const entries = Object.entries as <
  T extends { [key: string]: any },
  K extends keyof T
>(
  o: T
) => [keyof T, T[K]][];
