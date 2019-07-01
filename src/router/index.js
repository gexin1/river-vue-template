import Vue from 'vue';
import Router from 'vue-router';
import hooks from './hooks';
Vue.use(Router);

const routeList = [
    //主页
    {
        path: '/',
        name: 'layout',
        meta: {
            name: '布局',
            icon: 'home'
        },
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: 'page1',
                name: 'page1',
                meta: {
                    name: 'page1',
                    icon: 'home'
                },
                component: () => import('@/views/page1/index.vue')
            },
            {
                path: 'page2',
                name: 'page2',
                meta: {
                    name: 'page2',
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
