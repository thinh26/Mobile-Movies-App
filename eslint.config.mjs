import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import { stylingRules } from "./config/stylingRule.mjs";
import { eslintJsRules } from "./config/eslintJsRule.mjs";
import { eslintTsRules } from "./config/eslintTsRule.mjs";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "types",
      "app-example",
      "expo-env.d.ts",
      "bundle",
      ".vscode",
      "android",
      "ios",
      "node_modules",
      "index.js",
      "metro.config.js",
      "jest.config.js",
      "tailwind.config.js",
      "nativewind-env.d.ts",
    ],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.node,
      /* this settings below added to support tseslint, if you forget here the links:
        https://typescript-eslint.io/getting-started/typed-linting/
      */
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@stylistic": stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...eslintJsRules,
      ...eslintTsRules,
      ...stylingRules,
    },
    ignores: [".config/*"],
  }
);
