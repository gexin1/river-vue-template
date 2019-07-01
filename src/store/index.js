import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app.js';
import userInfo from './modules/user-info';
import tagsNav from './modules/tags-nav';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        app,
        userInfo,
        tagsNav
    }
});
