import TagsView from './TagsView.vue';

const TagsSelectView = {
    install: function(Vue) {
        Vue.component('TagsSelectView', TagsView);
    }
};

export default TagsSelectView;
