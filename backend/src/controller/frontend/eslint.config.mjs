import globals from "globals";
import path from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import pluginJs from "@eslint/js";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    files: ["**/*.js", "**/*.jsx"], 
  },
  {
    languageOptions: { 
      sourceType: "commonjs",
      globals: globals.browser,
      parserOptions: {
        "sourceType": "module",
        "ecmaVersion": "latest",
      }
    }
  },
  ...compat.extends("airbnb"),
  {
    rules: {
      'no-console': 'off',
      "react/prop-types": "off",
      'react/button-has-type': "off",
      'no-alert': 'off',
      'react/jsx-boolean-value': 'off',
    },
  },
  {
    indent: ["error", 4],
  },
  {
    settings: {
      'import/ignore': ['react-native'], 
      "import/parsers": {
        espree: [".js", ".cjs", ".mjs", ".jsx"], 
      }, 
    }, 
  },
  {
    files: ["components/cypress/*.js"],
    env: {
      "cypress/globals": true 
    },
    plugins: [
      "cypress"
    ],
    extends: [
      "plugin:cypress/recommended"
    ]
  },
  {
    files: ["./cypress/**/*"],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-console': 'off'
    }
  }
];
