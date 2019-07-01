import Vue from 'vue';

Vue.mixin({
    data() {
        return {
            GlobalTableHeight: 0
        };
    },
    mounted() {
        this.$nextTick(() => {});
    }
});
