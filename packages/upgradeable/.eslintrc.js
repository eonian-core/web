module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "standard",
    "plugin:prettier/recommended",
    "plugin:node/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    "node/no-missing-import": [
      "error",
      {
        resolvePaths: [__dirname],
        tryExtensions: [".js", ".json", ".node", ".ts"],
      },
    ],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-unused-vars": "off",
    "dot-notation": "off",
    camelcase: "off",
  },
};
