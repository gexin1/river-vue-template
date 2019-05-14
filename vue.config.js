const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { NODE_ENV } = process.env;
function resolve(dir) {
    return path.join(__dirname, '.', dir);
}
module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true
    },
    css: {
        // 是否开启 CSS source map
        sourceMap: false,
        loaderOptions: {
            css: {
                localIdentName: '[name]-[hash]',
                camelCase: 'only'
            },
            sass: {
                data: `@import "~@/styles/_base.scss";`
            }
        }
    },
    configureWebpack: config => {
        config.indexScript = [
            `<script src="https://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>`,
            `<script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script>`,
            `<script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script>`,
            `<script src="https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js"></script>`,
            `<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">`,
            `<script src="https://unpkg.com/element-ui/lib/index.js"></script>`
        ];
        config.resolve.alias = {
            '@': resolve('src')
        };
        if (NODE_ENV === 'production') {
            config.externals = {
                axios: 'axios',
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                'element-ui': 'ELEMENT'
            };
            //移除console
            const plugins = [];
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            config.plugins = [...config.plugins, ...plugins];
        }
    },
    chainWebpack: config => {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
    }
};
