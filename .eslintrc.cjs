module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended", 
    "plugin:prettier/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','vite.config.ts'],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
     version: "detect",
    },
  },
  parserOptions: { "project": ["./tsconfig.json"] },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
}
