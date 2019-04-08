module.exports = {
  extends: ["plugin:react/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    project: "./tsconfig.json",
    ecmaFeatures: {
      modules: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-shadow": "error",
    // Too many bugs for now
    // "no-unused-vars": "error",
    // "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/class-name-casing": "error",
    "@typescript-eslint/array-type": ["error", "array"],
    "@typescript-eslint/no-angle-bracket-type-assertion": "error",
    "@typescript-eslint/no-array-constructor": "error",
    "@typescript-eslint/no-empty-interface": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-namespace": "error",
    // makes reduce impossible
    // "@typescript-eslint/no-object-literal-type-assertion": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    // not in master?
    // "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-interface": "error",
    "@typescript-eslint/restrict-plus-operands": "error",
    "no-sequences": "error",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "error",
    "react/jsx-boolean-value": ["error", "never"],
    // memo false positives
    "react/display-name": "off",
    // negative effects
    "jsx-a11y/no-onchange": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      { some: ["nesting", "id"] },
    ],
    "mocha/no-exclusive-tests": "error",
    "no-unused-expressions": "error",
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "mocha"],
};
