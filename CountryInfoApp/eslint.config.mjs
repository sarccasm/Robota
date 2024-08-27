import typescriptParser from '@typescript-eslint/parser';
import angularEslintPlugin from '@angular-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ["src/**/*.ts", "src/**/*.tsx", "src/**/*.js", "src/**/*.jsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2020,
      },
    },
    plugins: {
      '@angular-eslint': angularEslintPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      "@angular-eslint/directive-selector": ["error", { "type": "attribute", "prefix": "app", "style": "camelCase" }],
      "@angular-eslint/component-selector": ["error", { "type": "element", "prefix": "app", "style": "kebab-case" }],
      "prettier/prettier": "error",
    },
  }
];
