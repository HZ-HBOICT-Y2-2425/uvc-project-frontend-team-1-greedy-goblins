import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginSvelte from 'eslint-plugin-svelte';
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    rules: {
      // override/add rules settings here, such as:
      // 'svelte/rule-name': 'error'
      "no-unused-vars": "error",
      "no-unmodified-loop-condition": "error",
      "no-console": "warn",
      "camelcase": "warn",
      //'svelte/button-has-type': 'error',
      //'svelte/require-each-key': 'warn',
      'svelte/indent': ['error', {'indent': 2, "alignAttributesVertically": true}],
      "svelte/first-attribute-linebreak": [
        "error",
        {
          "multiline": "below", // or "beside"
          "singleline": "beside" // "below"
        }
      ],
      "svelte/no-spaces-around-equal-signs-in-attribute": "error",
      "no-trailing-spaces": "off", // Don't need ESLint's no-trailing-spaces rule, so turn it off.
      "svelte/no-trailing-spaces": [
        "error",
        {
          "skipBlankLines": true,
          "ignoreComments": false
        }
      ]
    }
  }
];