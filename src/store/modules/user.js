import { resetRouter } from '@/router';

const state = {};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    }
};

const actions = {
    // user login
    login({ commit }, userInfo) {},

    // get user info
    getInfo({ commit, state }) {},

    // user logout
    logout({ commit, state }) {},

    // remove token
    resetToken({ commit }) {}
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
