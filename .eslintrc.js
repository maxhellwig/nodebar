module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["plugin:@typescript-eslint/recommended", "prettier", "prettier/@typescript-eslint"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    "project": "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module"
  }
};
