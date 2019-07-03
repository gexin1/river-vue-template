import Vue from 'vue';

Vue.mixin({
    data() {
        return {
            mixinTableHeight: '400px'
        };
    },
    mounted() {
        //如果当前页面存在 contair 和 header 就计算一下表格的高度
        if (this.$refs['mixin-contair'] && this.$refs['mixin-header']) {
            this.getTableHeight();
            window.onresize = () => {
                this.getTableHeight();
            };
        }
    },
    methods: {
        /**
         * 获取表格的高度 在数据更新完成
         */
        getTableHeight() {
            this.$nextTick(() => {
                let contair = this.getDomHeight('mixin-contair');
                let header = this.getDomHeight('mixin-header');
                this.mixinTableHeight = contair - header + 'px';
            });
        },
        /**
         * 获取dom的高度转换为数字
         * @param {String} ref
         */
        getDomHeight(ref) {
            return getComputedStyle(this.$refs[ref]).height.replace('px', '');
        }
    }
});
