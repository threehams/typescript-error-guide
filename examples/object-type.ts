// The `object` type is when you have no way of knowing
// what an object is ahead of time.

// If you've used Flow, don't be confused by this. This is not
// the weak `Object` type (which is now just an alias for `any`).
// It is closer to the empty object `{}`, and any property accesses
// will result in an error.

() => {
  const getEnabled = (data: object) => {
    data.enabled; // error
    if ("enabled" in data) {
      return data.enabled; // still an error
    }
  };
};

// Example: You don't know what the properties of an object
// are, but you know which ones you care about.
// This one's easy: see excess-property-checking.ts
() => {
  const getEnabled = (data: { enabled?: boolean }) => {
    return !!data.enabled;
  };
  const data1 = { enabled: true, name: "test1" };
  const data2 = { name: "test1" };
  getEnabled(data1);
  getEnabled(data2);
};
