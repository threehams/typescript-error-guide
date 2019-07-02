export {};

// go over APIs which can't be modeled at all
// example: camelize
() => {
  // from: https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case
  const camelize = (str: string) => {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };
  const kebabObj = {
    "kebab-key": 1,
  };
  const camelObj = {
    camelKey: 1,
  };
  const key = "kebab-key";
  kebabObj[key]; // OK!
  const camelKey = camelize("kebab-key"); // now "string" instead of "camelKey"
  camelObj[camelKey]; // can't index by string - must be a known property
};

// example: string concatenation used as key
const sizes = {
  "size-sm": 1,
  "size-md": 2,
  "size-lg": 3,
};

const getSize = (size: "sm" | "md" | "lg") => {
  return sizes[`size-${size}`];
};

// example: string corresponding to nested keys in object
() => {
  const getIn = () => {};
};

// example: array corresponding to nested keys in object
() => {
  const getIn = (path: string) => {};
};
