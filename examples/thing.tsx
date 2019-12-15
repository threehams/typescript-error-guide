interface Result {
  name?: string;
  value: string | number;
}

(name?: string) => {
  const result = {};
  // error, this property doesn't exist on {}
  if (name) {
    result.name = name;
  }
  result.value = 1;
};

(name?: string) => {
  const result: Result = {}; // error, missing property "value"
  if (name) {
    result.name = name;
  }
  result.value = 1;
};

(name?: string): Result => {
  const result = {} as Result;
  if (name) {
    result.name = name;
  }
  result.value = 1; // comment out this line: note, no error
  return result;
};
