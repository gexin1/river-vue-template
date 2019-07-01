<template>
    <div>
        <div v-for="(item, index) in routerList" :key="index">
            <Submenu
                :to="resolvePath(item.path)"
                :name="resolvePath(item.path)"
                v-if="item.children && item.children.length > 0"
            >
                <template slot="title">
                    <i class="el-icon-" v-if="item.meta.icon">
                        <svg-icon :icon-class="item.meta.icon" />
                    </i>
                    <span
                        :class="
                            !item.meta.icon ? 'title_name' : 'title_name_icon'
                        "
                        >{{ item.meta.name }}</span
                    >
                </template>
                <SlideBar
                    :router-list="item.children"
                    :base-path="item.path"
                ></SlideBar>
            </Submenu>
            <template v-else>
                <MenuItem
                    :to="resolvePath(item.path)"
                    :name="resolvePath(item.path)"
                >
                    <i class="el-icon-" v-if="item.meta.icon">
                        <svg-icon :icon-class="item.meta.icon" />
                    </i>
                    <span
                        :class="
                            !item.meta.icon ? 'title_name' : 'title_name_icon'
                        "
                        >{{ item.meta.name }}</span
                    >
                </MenuItem>
            </template>
        </div>
    </div>
</template>
<style></style>

<script>
import path from 'path';
export default {
    name: 'SlideBar',
    data() {
        return {
            isCollapse: false
        };
    },
    filters: {},
    props: {
        routerList: {
            type: Array,
            default: () => []
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    created() {},
    methods: {
        resolvePath(routePath) {
            console.log(path.resolve(this.basePath, routePath));
            return path.resolve(this.basePath, routePath);
        }
    }
};
</script>
<style lang="scss" scoped>
.title_name {
    padding-left: 19px;
}
.title_name_icon {
    padding-left: 10px;
}
</style>
