export default [
    {
        path: '/permission',
        name: 'permission',
        meta: {
            name: '权限',
            icon: 'home',
            roles: ['admin']
        },
        component: () => import('@/views/layout/index.vue'),
        children: [
            {
                path: 'page1',
                name: 'page1',
                meta: {
                    name: 'page1',
                    icon: 'home',
                    roles: ['admin']
                },
                component: () => import('@/views/page1/index.vue')
            },
            {
                path: 'page2',
                name: 'page2',
                meta: {
                    name: 'page2',
                    icon: 'home',
                    roles: ['admin']
                },
                component: () => import('@/views/page2/index.vue')
            }
        ]
    },
    {
        path: '*',
        meta: {
            tagHide: true,
            sideHide: true
        },
        redirect: '/404'
    }
];
