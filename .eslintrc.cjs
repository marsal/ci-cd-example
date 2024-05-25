module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier', 'cucumber'],
    rules: {
        // Aquí puedes agregar o modificar reglas específicas de ESLint si lo deseas
    },
    overrides: [
        {
            files: ['**/*.steps.ts'],
            rules: {
                'func-names': 'off',
                'prefer-arrow-callback': 'off',
            },
        },
    ],
};
