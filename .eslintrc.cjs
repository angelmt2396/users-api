module.exports = {
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    plugins: [],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
        es6: true,
    },
    ignorePatterns: ['.eslintrc.cjs'],
    rules: {
        'no-console': 'off',
        'no-unused-vars': 'warn',
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
