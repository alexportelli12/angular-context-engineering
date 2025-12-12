// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  {
    ignores: ['functions/**', 'dist/**', '.angular/**', '.ai/**'],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      prettier,
    ],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: false,
          order: [
            'STRUCTURAL_DIRECTIVE', // e.g. `*ngIf="true"`, `*ngFor="let item of items"`
            'TEMPLATE_REFERENCE', // e.g. `<input #inputRef>`
            'ATTRIBUTE_BINDING', // e.g. `<input required>`, `id="3"`
            'INPUT_BINDING', // e.g. `[id]="3"`, `[attr.colspan]="colspan"`, [style.width.%]="100", [@triggerName]="expression", `bind-id="handleChange()"`
            'TWO_WAY_BINDING', // e.g. `[(id)]="id"`, `bindon-id="id"
            'OUTPUT_BINDING', // e.g. `(idChange)="handleChange()"`, `on-id="handleChange()"`
          ],
        },
      ],
    },
  },
);
