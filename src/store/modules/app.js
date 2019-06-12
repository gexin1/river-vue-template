import { SLIDE_BAR_COLLAPSE_CHANGE } from '@/store/type';
const state = {
    collapse: false
};
const getters = {
    slideBarCollapseStatus: () => {
        return state.collapse;
    }
};
const mutations = {
    [SLIDE_BAR_COLLAPSE_CHANGE]: state => {
        state.collapse = !state.collapse;
    }
};
const actions = {};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
