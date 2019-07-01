module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'vue/no-parsing-error': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
