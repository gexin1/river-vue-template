const { titleDeploy } = require('./deploy.config.js');
const path = require('path');
const glob = require('glob');
/**
 * 寻找vue页面的入口文件
 * @returns {Object}
 */
exports.getTheEntryPage = function getTheEntryPage() {
    const pages = {};

    glob.sync('./src/views/**/{*.html,app.js}').forEach(fileDir => {
        let chunk = '';
        let entry = '';
        let template = 'public/index.html';
        // 兼容以前的写法 有.html结尾的地方为入口
        // 以app.js文件为入口
        if (path.extname(fileDir).includes('.html')) {
            template = fileDir;
            chunk = path.basename(fileDir, '.html');
            entry = fileDir.replace(/html$/g, 'js');
        } else {
            chunk = fileDir.split('./src/views/')[1].split('/app.js')[0];
            entry = fileDir;
        }
        pages[chunk] = {
            entry,
            template: template,
            title: titleDeploy[chunk] || '',
            chunks: ['chunk-vendors', 'chunk-common', chunk]
        };
    });

    return pages;
};

/**
 * 寻找指定插件
 * @param {Object} config  配置
 * @param {Object} plug    插件对象
 * @returns {Object}
 */
exports.findPlugin = function findPlugin(config, plug) {
    for (let item of config.plugins) {
        if (item instanceof plug) {
            return item;
        }
    }
    return {};
};

exports.resolve = function resolve(dir) {
    return path.join(__dirname, '.', dir);
};
