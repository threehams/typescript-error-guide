// avoid polluting other files
export {};

// go over "I narrowed and it widened my type in a callback"
// https://github.com/Microsoft/TypeScript/issues/9998

const acceptsUnion = () => {};
