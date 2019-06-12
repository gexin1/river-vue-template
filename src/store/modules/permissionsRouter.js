import asyncRouterMap from '@/router/asyncRouterMap';
import constantRouterMap from '@/router/constantRouterMap';
import { ADD_ROUTER, GENERATE_ROUTES } from '@/store/type';
import { permissionsFilterRouter } from '@/utils/routerHelp';

const state = {
    router: [],
    addRouters: []
};

const getters = {
    permissionsRouter: state => state.router,
    addRouters: state => state.addRouters
};

const mutations = {
    [ADD_ROUTER](state, payload = []) {
        state.addRouters = payload;
        state.router = constantRouterMap.concat(payload);
    }
};

const actions = {
    [GENERATE_ROUTES]({ commit }, data) {
        return new Promise(resolve => {
            console.log(data);
            const { roles } = data;
            const asyncRouterList = permissionsFilterRouter(
                asyncRouterMap,
                roles
            );
            commit(ADD_ROUTER, asyncRouterList);
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
