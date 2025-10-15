import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'

export default [
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'pnpm-lock.yaml']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: eslintPluginAstro.parser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro']
      }
    }
  },
  {
    rules: {
      // Standard JS Rules - https://standardjs.com/rules

      // Spacing and Formatting
      'indent': ['error', 2],
      'quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      'semi': ['error', 'never'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'space-before-function-paren': ['error', 'always'],
      'space-infix-ops': 'error',
      'comma-spacing': ['error', { before: false, after: true }],
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'curly': ['error', 'multi-line'],
      'block-spacing': ['error', 'always'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      'comma-dangle': ['error', 'never'],
      'comma-style': ['error', 'last'],
      'dot-location': ['error', 'property'],
      'eol-last': ['error', 'always'],
      'func-call-spacing': ['error', 'never'],
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      'no-trailing-spaces': 'error',
      'no-whitespace-before-property': 'error',
      'object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
      'padded-blocks': ['error', 'never'],
      'rest-spread-spacing': ['error', 'never'],
      'semi-spacing': ['error', { before: false, after: true }],
      'space-before-blocks': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'spaced-comment': ['error', 'always', { markers: ['!', ',', '*'] }],
      'template-curly-spacing': ['error', 'never'],
      'no-tabs': 'error',

      // Operators
      'eqeqeq': ['error', 'always', { null: 'ignore' }],
      'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
      'yoda': ['error', 'never'],

      // Variables
      'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
      'one-var': ['error', { initialized: 'never' }],
      'no-undef-init': 'error',
      'camelcase': ['error', { properties: 'never' }],

      // Best Practices
      'no-cond-assign': ['error', 'except-parens'],
      'no-return-assign': ['error', 'except-parens'],
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unneeded-ternary': ['error', { defaultAssignment: false }],
      'no-useless-call': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-rename': 'error',

      // ES6
      'no-duplicate-imports': 'error',
      'no-useless-constructor': 'error',
      'constructor-super': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'no-this-before-super': 'error',
      'no-new-symbol': 'error',
      'yield-star-spacing': ['error', { before: false, after: true }],

      // Objects and Arrays
      'no-array-constructor': 'error',
      'no-new-object': 'error',
      'no-new-wrappers': 'error',

      // Functions
      'handle-callback-err': ['error', '^(err|error)$'],
      'no-new-func': 'error',
      'accessor-pairs': ['error', { setWithoutGet: true, getWithoutSet: false }],

      // Regular Expressions
      'no-control-regex': 'error',
      'no-empty-character-class': 'error',
      'no-invalid-regexp': 'error',
      'no-regex-spaces': 'error',

      // Errors
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty-pattern': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extend-native': 'error',
      'no-extra-bind': 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-parens': ['error', 'functions'],
      'no-fallthrough': 'error',
      'no-floating-decimal': 'error',
      'no-func-assign': 'error',
      'no-global-assign': 'error',
      'no-implied-eval': 'error',
      'no-inner-declarations': ['error', 'functions'],
      'no-irregular-whitespace': 'error',
      'no-iterator': 'error',
      'no-label-var': 'error',
      'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
      'no-lone-blocks': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-multi-str': 'error',
      'no-new': 'error',
      'no-new-require': 'error',
      'no-obj-calls': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-path-concat': 'error',
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-self-assign': 'error',
      'no-shadow-restricted-names': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'no-useless-escape': 'error',
      'no-with': 'error',
      'use-isnan': 'error',
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
      'no-delete-var': 'error',
      'no-caller': 'error',
      'no-constant-condition': ['error', { checkLoops: false }],

      // TypeScript overrides
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }]
    }
  }
]
