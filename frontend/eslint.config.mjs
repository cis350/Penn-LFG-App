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
    files: ["**/*.js"], 
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
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },
  },
  {
    settings: {
      'import/ignore': ['react-native'], 
      "import/parsers": {
        espree: [".js", ".cjs", ".mjs", ".jsx"], 
      }, 
    }, 
  },
];
