//vue
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

import TagsSelectView from '@/components/tags-select-view/index.js';
//框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI).use(TagsSelectView);

import './global-import/index';
import './icons';
import './styles/global.scss';

Vue.config.productionTip = false;

Vue.component('CloumPlug', {
    props: {
        scope: {
            type: Object,
            default: () => ({})
        },
        attr: {
            type: Object,
            default: () => ({})
        },
        cloumData: {
            type: Object,
            default: () => ({})
        },
        render: {
            type: Function,
            default: h => {
                return [h('p', 'render函数')];
            }
        }
    },
    render: function(h) {
        return h(
            'el-table-column',
            [
                h('div', {
                    scopedSlots: {
                        default: props =>
                            h(
                                'el-button',
                                {
                                    on: {
                                        click: (e, scopedSlots) => {
                                            console.log(scopedSlots);
                                        }
                                    }
                                },
                                'hello'
                            )
                    }
                })
            ],
            'hello world'
        );
    }
});

Vue.prototype.$VM = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
