import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import userInfo from './modules/userInfo';
import tagsView from './modules/tagsView';
import permissionsRouter from './modules/permissionsRouter';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: { app, userInfo, tagsView, permissionsRouter },
    actions: {}
});
