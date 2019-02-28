module.exports = {
  'env': {
    'es6': true,
    'node': true,
  },
  'extends': 'prettier',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'plugins': ['@typescript-eslint', 'prettier'],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'prettier/prettier': 'error',
  },
};
