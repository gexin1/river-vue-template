<template>
    <div class="main">
        <Layout>
            <Sider
                hide-trigger
                collapsible
                :width="200"
                :collapsed-width="64"
                v-model="sideCollapseGetter"
                class="left-sider"
                :style="{ overflow: 'hidden' }"
            >
                <side-menu
                    accordion
                    ref="sideMenu"
                    :active-name="$route.name"
                    :collapsed="sideCollapseGetter"
                    @on-select="turnToPage"
                    :menu-list="routerList"
                >
                    <div class="logo-con">
                        <img
                            v-show="!sideCollapseGetter"
                            :src="maxLogo"
                            key="max-logo"
                        />
                        <img
                            v-show="sideCollapseGetter"
                            :src="minLogo"
                            key="min-logo"
                        />
                    </div>
                </side-menu>
            </Sider>
            <Layout>
                <Header>
                    <NavBar></NavBar>
                </Header>
                <Content>
                    <Layout class="main-layout-con">
                        <div class="tag-nav-wrapper">
                            <tags-nav
                                :value="$route"
                                @input="handleClick"
                                :list="visitedViewsGetter"
                                @on-close="handleCloseTag"
                            />
                        </div>
                        <Content class="content-wrapper">
                            <transition name="fade-transverse" mode="out-in">
                                <router-view />
                            </transition>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';
import SideMenu from './components/side-menu/index';
import { routerFilter } from '@/utils/util';
import { mapGetters, mapMutations } from 'vuex';
import minLogo from '@/assets/imgs/logo-min.jpg';
import maxLogo from '@/assets/imgs/logo.jpg';
import TagsNav from './components/tags-nav';
export default {
    name: 'Main',
    data() {
        return {
            minLogo,
            maxLogo,
            routerList: [],
            isCollapsed: false,
            collapsed: false
        };
    },
    computed: {
        ...mapGetters('app', ['sideCollapseGetter']),
        ...mapGetters('tagsNav', ['visitedViewsGetter'])
    },
    components: {
        NavBar,
        SideMenu,
        TagsNav
    },
    filters: {},
    created() {
        this.routerList = routerFilter(this.$router.options.routes);
    },
    methods: {
        ...mapMutations('tagsNav', [
            'SET_ROUTE',
            'ADD_ROUTE',
            'DEL_ROUTE',
            'DEL_OTHER_ROUTE'
        ]),
        handleClick(item) {
            this.turnToPage(item);
        },
        handleCloseTag(res) {
            console.log(res);
            this.SET_ROUTE({
                payload: res
            });
        },
        turnToPage(route) {
            let { name, params, query } = {};
            if (typeof route === 'string') name = route;
            else {
                name = route.name;
                params = route.params;
                query = route.query;
            }
            if (name.indexOf('isTurnByHref_') > -1) {
                window.open(name.split('_')[1]);
                return;
            }
            this.$router.push({
                name,
                params,
                query
            });
        }
    },
    watch: {
        $route: {
            handler(newRoute) {
                this.ADD_ROUTE({
                    payload: newRoute
                });
            },
            immediate: true
        }
    }
};
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100vh;
    /deep/ .ivu-layout-header {
        background: #fff;
        padding: 0;
    }

    /deep/ .ivu-layout-content {
        box-sizing: border-box;
    }
    .left-sider {
        height: 100vh;
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

.main {
    .logo-con {
        height: 64px;
        padding: 10px;
        img {
            height: 44px;
            width: auto;
            display: block;
            margin: 0 auto;
        }
    }
    .header-con {
        background: #fff;
        padding: 0 20px;
        width: 100%;
    }
    .main-layout-con {
        height: 100%;
        overflow: hidden;
    }
    .main-content-con {
        height: calc(100% - 60px);
        overflow: hidden;
    }
    .tag-nav-wrapper {
        padding: 0;
        height: 40px;
        background: #f0f0f0;
    }
    .content-wrapper {
        padding: 18px;
        height: calc(100% - 80px);
        overflow: auto;
    }
    .left-sider {
        .ivu-layout-sider-children {
            overflow-y: scroll;
            margin-right: -18px;
        }
    }
}
</style>
<style lang="scss">
.ivu-menu-item > i {
    margin-right: 12px !important;
}
.ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
    margin-right: 8px !important;
}
.collased-menu-dropdown {
    width: 100%;
    margin: 0;
    line-height: normal;
    padding: 7px 0 6px 16px;
    clear: both;
    font-size: 12px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover {
        background: rgba(100, 100, 100, 0.1);
    }
    & * {
        color: #515a6e;
    }
    .ivu-menu-item > i {
        margin-right: 12px !important;
    }
    .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
        margin-right: 8px !important;
    }
}

.ivu-select-dropdown.ivu-dropdown-transfer {
    max-height: 400px;
}
</style>
