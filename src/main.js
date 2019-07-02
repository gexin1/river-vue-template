//vue
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import config from '@/config';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import './global-import/index';
import './icons';
import './styles/global.scss';

Vue.use(iView);
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
