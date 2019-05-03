// avoid polluting other files
export {};

// go over: open types
// opt in to changing this assumption with either declaration merging
// or utility functions

const keys = Object.keys as <T>(o: T) => (Extract<keyof T, string>)[];
const entries = Object.entries as <
  T extends { [key: string]: any },
  K extends keyof T
>(
  o: T
) => [keyof T, T[K]][];
