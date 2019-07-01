//vue
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import config from '@/config';
import TagsSelectView from '@/components/tags-select-view/index.js';

//框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(ElementUI)
    .use(TagsSelectView)
    .use(iView);

import './global-import/index';
import './icons';
import './styles/global.scss';

Vue.config.productionTip = false;

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
Vue.prototype.$VM = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
