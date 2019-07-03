import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';

import '@/global';
import '@/icons'; // icon
import '@/permission'; // permission control

// set ElementUI lang to EN
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$VM = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
