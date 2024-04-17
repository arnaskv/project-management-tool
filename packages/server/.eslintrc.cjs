module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript/base',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**/*.js'],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@server/**',
            group: 'internal',
          },
          {
            pattern: '@tests/**',
            group: 'internal',
          },
        ],
      },
    ],

    'no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    'import/prefer-default-export': 'off',
  },

  overrides: [
    {
      files: ['src/database/migrations/**/*.ts'],
      rules: {
        'class-methods-use-this': 'off',
      },
    },

    {
      files: ['src/entities/**/*.ts'],
      rules: {
        'import/no-cycle': 'off',
      },
    },
  ],
}
