<template>
    <div class="layout">
        <el-container>
            <el-aside>
                <el-menu
                    :show-timeout="200"
                    :default-active="$route.path"
                    :collapse="collapseStatus"
                    mode="vertical"
                    background-color="#304156"
                    text-color="#bfcbd9"
                    active-text-color="#409EFF"
                    router
                    class="menu_vertical"
                    style="height:100%"
                >
                    <SideBar :router-list="routerList"></SideBar>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <NavBar></NavBar>
                </el-header>
                <div class="tag-select-view">
                    <tags-select-view></tags-select-view>
                </div>

                <el-main>
                    <transition name="fade-transverse" mode="out-in">
                        <router-view />
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import { routerFilter } from '@/utils/util';
import { mapGetters } from 'vuex';
export default {
    name: 'Layout',
    data() {
        return { routerList: [] };
    },
    computed: {
        ...mapGetters('app', {
            collapseStatus: 'slideBarCollapseStatus'
        })
    },
    components: {
        SideBar,
        NavBar
    },
    filters: {},
    created() {
        this.routerList = routerFilter(this.$router.options.routes);
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
.layout {
    width: 100%;
    height: 100vh;
    & /deep/ .el-aside {
        width: auto !important;
    }
    & /deep/ .menu_vertical:not(.el-menu--collapse) {
        width: 200px;
    }
    & /deep/ .el-menu--collapse {
        .el-submenu__icon-arrow {
            display: none;
        }
        .title_name_icon {
            display: none;
        }
    }
    & /deep/ .el-container {
        height: 100vh;
    }
    & /deep/ .el-submenu {
        overflow-x: hidden;
    }
    & /deep/ .el-header {
        padding: 0;
    }
    & /deep/ *[class^='el-icon-'] {
        font-size: 13px;
    }

    // 过渡动画 横向渐变
    .fade-transverse-leave-active,
    .fade-transverse-enter-active {
        transition: all 0.5s;
    }
    .fade-transverse-enter {
        opacity: 0;
        transform: translateX(-30px);
    }
    .fade-transverse-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    // 过渡动画 缩放渐变
    .fade-scale-leave-active,
    .fade-scale-enter-active {
        transition: all 0.5s;
    }
    .fade-scale-enter {
        opacity: 0;
        transform: scale(1.2);
    }
    .fade-scale-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }
    .tag-select-view {
        flex: none;
        // padding: 0 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
    }
}
</style>
