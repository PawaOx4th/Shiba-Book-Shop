module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb", "prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: [0, "single", { avoidEscape: true }],
    "comma-dangle": [
      0,
      {
        arrays: "never",
        objects: "never",
        imports: "never",
        exports: "never",
        functions: "never"
      }
    ],
    "arrow-parens": [0],
    "operator-linebreak": [0],
    "no-plusplus": [0, { allowForLoopAfterthoughts: true }],
    "no-await-in-loop": [0],
    "array-callback-return ": [0],
    "no-return-assign": [0],
    "no-sequences": [0],
    "no-case-declarations": [0],
    "consistent-return": [0],
    "no-unused-expressions": [0],
    "prefer-destructuring ": [0],
    "no-param-reassign": [0],
    "array-callback-return": [0]
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
