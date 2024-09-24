import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "node_modules/**/*",
        "packages/**/dist/**/*",
        "packages/**/coverage/**/*",
        "**/nvl-modules/",
    ],
}, ...compat.extends("eslint:recommended", "prettier", "plugin:@typescript-eslint/recommended"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        react,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
    },

    settings: {
        react: {
            version: "detect",
        },
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-empty-function": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            vars: "all",
            varsIgnorePattern: "^_*",
            args: "after-used",
            argsIgnorePattern: "^_",
        }],

        "array-callback-return": "off",
        "arrow-body-style": "off",
        "block-scoped-var": "error",
        camelcase: "off",
        "consistent-return": "off",
        "consistent-this": ["error", "self"],
        "constructor-super": "error",
        curly: ["error", "all"],
        "default-case": "error",
        "default-param-last": "off",
        "dot-notation": "error",
        eqeqeq: "off",
        "func-names": "error",

        "func-style": ["error", "declaration", {
            allowArrowFunctions: true,
        }],

        "grouped-accessor-pairs": "error",
        "line-comment-position": "off",
        "lines-between-class-members": "error",
        "max-depth": "error",

        "max-len": ["off", {
            code: 120,
            comments: 120,
            ignoreUrls: true,
            ignoreTemplateLiterals: true,
        }],

        "max-lines-per-function": ["off"],
        "max-nested-callbacks": ["error", 5],
        "max-statements": ["off"],
        "max-statements-per-line": "error",
        "no-alert": "off",
        "no-array-constructor": "error",
        "no-await-in-loop": "off",
        "no-buffer-constructor": "error",
        "no-caller": "error",
        "no-confusing-arrow": "error",
        "no-console": "warn",
        "no-constructor-return": "error",
        "no-constant-condition": "error",
        "no-debugger": "warn",
        "no-dupe-else-if": "error",
        "no-else-return": "error",

        "no-empty-function": ["off", {
            allow: ["constructors"],
        }],

        "no-eq-null": "off",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-implicit-coercion": "error",
        "no-implicit-globals": "error",
        "no-implied-eval": "error",
        "no-import-assign": "error",
        "no-invalid-this": "off",
        "no-iterator": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-lonely-if": "error",
        "no-loop-func": "error",
        "no-magic-numbers": "off",
        "no-multi-assign": "error",
        "no-multi-str": "error",
        "no-nested-ternary": "off",
        "no-new": "error",
        "no-new-func": "error",
        "no-new-object": "error",
        "no-new-wrappers": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "off",
        "no-path-concat": "error",
        "no-plusplus": "off",
        "no-proto": "off",
        "no-restricted-globals": "error",
        "no-return-assign": "error",
        "no-return-await": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-setter-return": "error",
        "no-sync": "error",
        "no-tabs": "error",
        "no-template-curly-in-string": "error",
        "no-underscore-dangle": "off",
        "no-unmodified-loop-condition": "error",
        "no-unneeded-ternary": "error",
        "no-unreachable": "error",
        "no-unused-expressions": "off",
        "no-useless-call": "error",
        "no-useless-computed-key": "error",
        "no-useless-concat": "off",
        "no-useless-rename": "error",
        "no-useless-return": "error",
        "no-var": "error",

        "no-void": ["error", {
            allowAsStatement: true,
        }],

        "one-var": ["error", "never"],
        "operator-assignment": "error",
        "padding-line-between-statements": "error",
        "prefer-arrow-callback": "warn",
        "prefer-const": "off",

        "prefer-destructuring": ["warn", {
            VariableDeclarator: {
                array: true,
                object: true,
            },

            AssignmentExpression: {
                array: false,
                object: false,
            },
        }],

        "prefer-numeric-literals": "warn",
        "prefer-promise-reject-errors": "warn",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "prefer-template": "warn",
        radix: "off",
        "require-atomic-updates": "off",
        "require-await": "warn",
        "sort-keys": "off",

        "spaced-comment": ["warn", "always", {
            markers: ["/"],
        }],

        "symbol-description": "error",
        yoda: "error",
    },
}];