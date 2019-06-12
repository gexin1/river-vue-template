import store from '@/store/index';
import { GENERATE_ROUTES, ADD_ROUTE, REQ_GET_USER_INFO } from '@/store/type';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
//路由的全局导航守卫
const hook = router => {
    router.beforeEach((to, from, next) => {
        NProgress.start();

        const userRoles = store.getters['userInfo/userRoles'];

        if (userRoles && userRoles.length > 0) {
            next();
        } else {
            store
                .dispatch({
                    type: `userInfo/${REQ_GET_USER_INFO}`
                })
                .then(() => {
                    return store.dispatch({
                        type: `permissionsRouter/${GENERATE_ROUTES}`,
                        roles: store.getters['userInfo/userRoles']
                    });
                })
                .then(() => {
                    const addRouters =
                        store.getters['permissionsRouter/addRouters'];
                    router.addRoutes(addRouters);
                    next({ ...to, replace: true });
                });
        }
    });

    router.afterEach((to, from, next) => {
        NProgress.done();
        window.scrollTo(0, 0);
    });
};

export default hook;
