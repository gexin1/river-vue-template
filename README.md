# river-vue-template

## Project setup
```
npm install

npm run dev

npm run build:dev     开发打包

npm run build:release 发布打包

```
### 目录结构
```
|-- river-vue-template
    |-- .browserslistrc
    |-- .env
    |-- .env.development
    |-- .env.production
    |-- .eslintrc.js
    |-- .gitignore
    |-- .prettierrc
    |-- babel.config.js
    |-- cdn-config.js//cdn配置
    |-- postcss.config.js
    |-- vue.config.js
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.js
        |-- api
        |   |-- login-api.js
        |-- assets
        |   |-- user
        |       |-- logo.jpeg
        |-- components
        |   |-- Pagination
        |   |-- SvgIcon
        |   |-- tags-select-view
        |-- global-import
        |   |-- filter.js
        |   |-- index.js
        |   |-- mixins.js
        |-- icons
        |-- router
        |   |-- hooks.js
        |   |-- index.js
        |-- store
        |   |-- index.js
        |   |-- modules
        |-- styles
        |   |-- global.scss
        |   |-- _base.scss
        |-- utils
        |   |-- request.js
        |   |-- util.js
        |-- views
```
### cdn-config.js
启动cdn配置会减少app包的体积 网络请求会更快 
```
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
```
