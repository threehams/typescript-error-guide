// let's say you start out with a couple function that work with strings:
() => {
  const last = (item: string) => {
    return item[item.length - 1];
  };

  const lastChar = last("things"); // OK!
  lastChar.toString(); // also OK
};

// After using it for a bit, you find a usage for arrays of numbers:
// but you realize that the return value is now `string | number`
() => {
  const last = (item: string | number[]) => {
    return item[item.length - 1];
  };

  const lastChar = last("things"); // OK!
  lastChar.length; // error - this doesn't exist on `number`
};

// It would be really nice if TypeScript could figure this stuff out.
// This is where generics come in.
// A generic is a type which accepts arguments, just as a function
// accepts arguments.
// Simple example:
() => {
  interface Location<Query> {
    pathname: string;
    query: Query;
  }

  const locationWithoutQuery: Location<null> = {
    pathname: "/",
    query: null, // OK!
  };

  const locationWithQuery: Location<{ id: string }> = {
    pathname: "/",
    query: { personId: "1" }, // error: query must include "id"
  };
};

// Let's use this above:
() => {
  type Last<TItem> = (item: TItem) => TItem;
  const last: Last<> = item => {
    return item[item.length - 1];
  };

  const lastChar = last("things"); // OK!
  lastChar.toString(); // also OK
};
