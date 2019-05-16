const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const cdn = require('./cdn-config');
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
        const plugins = [];
        //配置别名
        config.resolve.alias = {
            '@': resolve('src')
        };

        if (cdn.isUse && NODE_ENV === cdn.mode) {
            //使用cdn
            config.externals = cdn.externals;

            for (let item of config.plugins) {
                if (item instanceof HtmlWebpackPlugin) {
                    item.options.cdnCSSList = cdn.cdnCSSList;
                    item.options.cdnJSList = cdn.cdnJSList;
                    break;
                }
            }
        }
        //lodash
        //配置参考https://github.com/lodash/lodash-webpack-plugin#readme
        plugins.push(new LodashModuleReplacementPlugin());

        if (NODE_ENV === 'production') {
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
        if (NODE_ENV === 'production') {
            //配置 lodash
            config.module
                .rule('lodash-code-split')
                .exclude.add(resolve('node_modules'))
                .add(resolve('dist'))
                .add(resolve('test'))
                .end()
                .test(/\.js$/)
                .use('babel-loader')
                .loader('babel-loader')
                .options({
                    presets: ['@babel/preset-env'],
                    plugins: ['lodash']
                })
                .end();
        }
    }
};
