<template>
    <div class="main">
        <Layout>
            <Sider
                ef="side1"
                hide-trigger
                collapsible
                :collapsed-width="78"
                v-model="isCollapsed"
            >
                <Menu
                    :active-name="$route.path"
                    :collapse="collapseStatus"
                    mode="vertical"
                    router
                    width="auto"
                    style="height:100vh;"
                >
                    <SideBar :router-list="routerList"></SideBar>
                </Menu>
            </Sider>
            <Layout>
                <Header>
                    <NavBar></NavBar>
                </Header>
                <Content>
                    <transition name="fade-transverse" mode="out-in">
                        <router-view />
                    </transition>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import { routerFilter } from '@/utils/util';
import { mapGetters } from 'vuex';
export default {
    name: 'Main',
    data() {
        return { routerList: [], isCollapsed: false };
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
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
}
.menu-icon {
    transition: all 0.3s;
}
.rotate-icon {
    transform: rotate(-90deg);
}
.menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
}
.menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
}
.collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
}

.main {
    width: 100%;
    height: 100vh;
    /deep/ .ivu-layout-header {
        background: #fff;
        padding: 0;
    }

    /deep/ .ivu-layout-content {
        padding: 20px;
        box-sizing: border-box;
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
}
</style>
