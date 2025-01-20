import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginSvelte from 'eslint-plugin-svelte';
import visualComplexity from "eslint-plugin-visual-complexity";

export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    plugins: {
      visual: visualComplexity
    },
    rules: {
      "visual/complexity": ["error", { max: 6 }],
      complexity: 0, // <- disable core complexity rule
    }
  },
  {
    rules: {
      // override/add rules settings here, such as:
      // 'svelte/rule-name': 'warn'
      "no-unused-vars": "error",
      "no-unmodified-loop-condition": "warn",
      "no-console": "error",
      "camelcase": "warn",
      //'svelte/button-has-type': 'warn',
      //'svelte/require-each-key': 'warn',
      'svelte/indent': ['warn', {'indent': 2, "alignAttributesVertically": true}],
      "svelte/first-attribute-linebreak": [
        "warn",
        {
          "multiline": "below", // or "beside"
          "singleline": "beside" // "below"
        }
      ],
      "svelte/no-spaces-around-equal-signs-in-attribute": "warn",
      "no-trailing-spaces": "off", // Don't need ESLint's no-trailing-spaces rule, so turn it off.
      "svelte/no-trailing-spaces": [
        "warn",
        {
          "skipBlankLines": true,
          "ignoreComments": false
        }
      ]
    }
  },
  {
    ignores: ["src/lib/components/MarketBox.svelte"]
  }
];
