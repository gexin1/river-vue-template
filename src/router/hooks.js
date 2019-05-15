import store from '@/store/index';

const hook = router => {
    router.beforeEach((to, from, next) => {
        if (!to.meta.tagHide) {
            store.commit({
                type: 'tagsView/ADD_ROUTE',
                payload: {
                    path: to.path,
                    name: to.meta.name,
                    fullPath: to.fullPath,
                    query: to.query
                }
            });
        }
        next();
    });

    router.afterEach((to, from, next) => {
        window.scrollTo(0, 0);
    });
};

export default hook;
