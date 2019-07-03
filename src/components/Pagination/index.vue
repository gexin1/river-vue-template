<template>
    <div :class="['pagination-container', position]">
        <el-pagination
            :background="background"
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :layout="layout"
            :page-sizes="pageSizeList"
            :total="total"
            v-bind="$attrs"
            :small="small"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        total: {
            type: Number,
            default: () => 0
        },
        page: {
            type: Number,
            default: 1
        },
        page_size: {
            type: Number,
            default: 20
        },
        pageSizeList: {
            type: Array,
            default() {
                return [10, 20, 30, 50, 100];
            }
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        background: {
            type: Boolean,
            default: true
        },
        hidden: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: 'bottom_right'
        },
        small: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page;
            },
            set(val) {
                this.$emit('update:page', val);
            }
        },
        pageSize: {
            get() {
                return this.page_size;
            },
            set(val) {
                this.$emit('update:page_size', val);
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', {
                page: this.currentPage,
                page_size: val
            });
        },
        handleCurrentChange(val) {
            this.$emit('pagination', { page: val, page_size: this.pageSize });
        }
    }
};
</script>

<style lang="scss" scoped>
.pagination-container {
    padding: 32px 16px;
    &.bottom_right {
        position: absolute;
        bottom: -100px;
        right: 20px;
        z-index: 300;
    }
    &.bottom {
        padding: 10px;
    }
}
.pagination-container.hidden {
    display: none;
}
</style>
