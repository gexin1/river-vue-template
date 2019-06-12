import { Loading } from 'element-ui';
import {
    ADD_ROLES,
    ADD_USER_INFO,
    CLEAR_USER_INFO,
    REQ_GET_USER_INFO
} from '@/store/type';
const state = {
    userInfo: {},
    roles: []
};
const getters = {
    getUserInfo(state) {
        return state.userInfo;
    },
    userRoles(state) {
        return state.roles;
    }
};
const mutations = {
    [ADD_ROLES](state, roles) {
        state.roles = roles;
    },
    [ADD_USER_INFO](state, payload) {
        state.userInfo = payload;
    },
    [CLEAR_USER_INFO](state) {
        state.userInfo = {};
    }
};
const actions = {
    [REQ_GET_USER_INFO]({ state, commit }) {
        return new Promise(resolve => {
            commit(ADD_ROLES, ['admin']);
            resolve();
        });
        // const loading = Loading.service({
        //     lock: true,
        //     text: '努力加载中...',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.9)'
        // });
    }
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
