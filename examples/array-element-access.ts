// This seems wrong...
const array = [0, 1];
array[0];
array[1];
array[2]; // hey! this should be an error!

// but just like objects are mutable in TS, so are arrays.
// Imagine this case:
const pushToArray = <T>(arr: T[], element: T): T[] => {
  arr.push(element);
  return arr;
};

const arr = [0, 1];
pushToArray(arr, 2); // now arr[2] exists
arr[2]; // if TS showed an error here, it would be extremely annoying

// TypeScript would have to do a lot more work to analyze your code to figure
// out safe array access - and it's just not a common enough case to be worth
// the cost.

// However, tuple types exist, which have a known length that can never change.
// Checking access on these is cheap, so use `as const` to change from number[]
// (array of numbers of any length) to [number, number] (array of numbers with
// a length of 2).
// (you'll see the term "const context" floating around: it means "immutable")
const tuple = [0, 1] as const;

tuple[0];
tuple[1];
tuple[2]; // correctly an error
