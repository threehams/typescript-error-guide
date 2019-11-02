export {};
// The `void` is the absence of a type. It has one purpose: to
// allow functions to return values which are ignored.
// A practical use for this is an event handler which may want
// to use a braceless arrow function.

// Contrast this with `undefined`, which enforces a return statement.
type OnMouseEnter = () => void;
const onMouseEnter: OnMouseEnter = () => false; // fine
const returnValue = onMouseEnter(); // returnValue === void

type OnMouseLeave = () => undefined;
const onMouseLeave: OnMouseLeave = () => false; // error: false !== undefined

// Note that void is more strict when put directly on a function.
const returnUndefined = (): undefined => {
  return false; // error: false !== undefined
};
const returnVoid = (): void => {
  return false; // error: false !== void
};
