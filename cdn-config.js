//使用cdn配置
const cdn = {
    isUse: true,
    mode: 'production',
    externals: {
        axios: 'axios',
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT'
    },
    cdnCSSList: [
        `https://cdn.bootcss.com/element-ui/2.8.2/theme-chalk/index.css`
    ],
    cdnJSList: [
        `https://cdn.bootcss.com/axios/0.18.0/axios.min.js`,
        `https://cdn.bootcss.com/vue/2.6.10/vue.min.js`,
        `https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js`,
        `https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js`,
        `https://cdn.bootcss.com/element-ui/2.8.2/index.js`
    ]
};
module.exports = cdn;
