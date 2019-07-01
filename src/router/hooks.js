const hook = router => {
    router.beforeEach((to, from, next) => {
        next();
    });

    router.afterEach((to, from, next) => {
        window.scrollTo(0, 0);
    });
};

export default hook;
