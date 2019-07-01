const TOGGLE_SIDE_COLLAPSE = `TOGGLE_SIDE_COLLAPSE`;
const state = {
    sideCollapse: false
};
const getters = {
    sideCollapseGetter: state => {
        return state.sideCollapse;
    }
};
const mutations = {
    [TOGGLE_SIDE_COLLAPSE]: state => {
        state.sideCollapse = !state.sideCollapse;
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
