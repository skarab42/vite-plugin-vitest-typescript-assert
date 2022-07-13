module.exports = {
  root: true,
  env: { es2022: true, node: true, browser: false },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './tsconfig.*.json'],
  },
  plugins: ['@typescript-eslint', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/strict',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    'no-alert': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
  },
  settings: {
    'import/resolver': {
      node: { extensions: ['.ts', '.js', '.cjs', '.mjs'] },
    },
  },
};
