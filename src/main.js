//vue
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import TagsSelectView from '@/components/TagsSelectView/index.js';
//框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//配置文件
import config from '@/config/index';

Vue.use(ElementUI).use(TagsSelectView);

import './global/index';
import './icons';
import './styles/global.scss';

Vue.config.productionTip = false;

Vue.prototype.$config = config;

Vue.prototype.$VM = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
