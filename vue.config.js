const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        //配置别名
        config.resolve.alias = {
            '@': resolve('src')
        };
        const plugins = [];

        if (NODE_ENV === 'production') {
            //使用cdn
            config.externals = {
                axios: 'axios',
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                'element-ui': 'ELEMENT'
            };
            for (let item of config.plugins) {
                if (item instanceof HtmlWebpackPlugin) {
                    item.options.cdnConfig = [
                        `https://cdn.bootcss.com/axios/0.18.0/axios.min.js`,
                        `https://cdn.bootcss.com/vue/2.6.10/vue.min.js`,
                        `https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js`,
                        `https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js`,
                        `https://unpkg.com/element-ui/lib/theme-chalk/index.css`,
                        `https://unpkg.com/element-ui/lib/index.js`
                    ];
                    break;
                }
            }
            //移除console
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: ['console.log']
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
        }
        config.plugins = [...config.plugins, ...plugins];
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
