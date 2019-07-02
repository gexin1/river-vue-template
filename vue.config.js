const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { dnsDeploy, cdnDeploy } = require('./deploy.config.js');
const { findPlugin, resolve } = require('./vue.config.help.js');
const { NODE_ENV, VUE_APP_DIST_SIZE_ANALYZE } = process.env;

module.exports = {
    productionSourceMap: false,
    css: {
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
    devServer: {
        port: 8080
    },
    configureWebpack: config => {
        const plugins = [];
        //配置别名
        config.resolve.alias = {
            '@': resolve('src')
        };
        const htmlPlugin = findPlugin(config, HtmlWebpackPlugin);
        //使用dns预解析
        if (dnsDeploy.isUse && NODE_ENV === dnsDeploy.mode) {
            htmlPlugin.options.dnsDeploy = dnsDeploy.list;
        }
        //添加 cdn
        if (cdnDeploy.isUse && NODE_ENV === cdnDeploy.mode) {
            htmlPlugin.options.cdnCSSList = cdnDeploy.cdnCSSList;
            htmlPlugin.options.cdnJSList = cdnDeploy.cdnJSList;
            config.externals = cdnDeploy.externals;
        }
        //dist目录代码大小分析
        if (VUE_APP_DIST_SIZE_ANALYZE) {
            plugins.push(
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static'
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
