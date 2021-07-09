module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },

  plugins: ['prettier', 'node'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:node/recommended'],
  env: {
    node: true,
  },
  rules: {
    'max-len': ['error', { code: 160 }],
  },
  overrides: [
    {
      files: ['*.js'],
      env: {
        jest: true,
      },
      rules: {
        'next-line': 0,
      },
    },
  ],
};
