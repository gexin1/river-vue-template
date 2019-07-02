module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-unused-vars': [0, { vars: 'all', args: 'after-used' }],
        'no-constant-condition': 'off'
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
