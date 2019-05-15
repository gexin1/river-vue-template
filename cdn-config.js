//使用cdn配置
const cdn = {
    //是否启用
    isUse: true,
    //在什么模式下启用
    mode: 'production',
    // 参考 https://webpack.docschina.org/configuration/externals/
    externals: {
        axios: 'axios',
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT'
    },
    //需要挂载的css js
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
