import Vue from 'vue';
import Router from 'vue-router';
import hooks from './hooks';

const Layout = () => import('@/views/layout/index.vue');

Vue.use(Router);

const routeList = [
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Layout,
        meta: {
            tagHide: true,
            sideHide: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    name: '首页',
                    notCache: true,
                    icon: 'md-home'
                },
                component: () => import('@/views/home/index.vue')
            }
        ]
    },
    //主页
    {
        path: '/',
        name: 'layout',
        meta: {
            name: '布局',
            icon: 'home'
        },
        component: Layout,
        children: [
            {
                path: 'page1',
                name: 'page1',
                meta: {
                    name: '页面1',
                    icon: 'home'
                },
                component: () => import('@/views/page1/index.vue')
            },
            {
                path: 'page2',
                name: 'page2',
                meta: {
                    name: 'page',
                    icon: 'home'
                },
                component: () => import('@/views/page2/index.vue')
            }
        ]
    },
    //登录
    {
        path: '/login',
        name: 'login',
        meta: {
            name: '登录',
            icon: 'home',
            tagHide: true,
            sideHide: true
        },
        component: () => import('@/views/login/index.vue')
    },
    {
        path: '*',
        meta: {
            tagHide: true,
            sideHide: true
        },
        component: () => import('@/views/error/404.vue')
    }
];

const router = new Router({
    routes: routeList
});

hooks(router);

export { routeList };

export default router;
