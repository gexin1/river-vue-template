export default [
    //主页
    {
        path: '/',
        name: 'layout',
        meta: {
            name: '布局',
            icon: 'home',
            role: []
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
    //主页
    {
        path: '/util-pages',
        name: 'utilPages',
        meta: {
            name: '通用页面',
            icon: 'home',
            role: []
        },
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: 'empty-content',
                name: 'emptyContent',
                meta: {
                    name: '空页面',
                    icon: 'home'
                },
                component: () => import('@/views/utilPages/emptyContent.vue')
            },
            {
                path: 'not-permission',
                name: 'notPermission',
                meta: {
                    name: '没有权限',
                    icon: 'home'
                },
                component: () => import('@/views/utilPages/notPermission.vue')
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
        path: '/404',
        meta: {
            tagHide: true,
            sideHide: true
        },
        component: () => import('@/views/error/404.vue')
    }
];
