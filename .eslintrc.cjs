process.env.TS_ROOT = __dirname

module.exports = {
  extends: ['@eonian/eslint-config', 'next/core-web-vitals', 'plugin:storybook/recommended'],
  rules: {
    'react/jsx-indent': 'off',
    'react/function-component-definition': [2, { 
      "namedComponents": ["arrow-function", "function-declaration"],
      "unnamedComponents": "arrow-function"
    }],
    'curly': ["error", "multi-or-nest"]
  },
}
