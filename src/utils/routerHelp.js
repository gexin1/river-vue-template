const routerFilter = routerList => {
    return routerList.filter(item => {
        if (item.meta && item.meta.sideHide) {
            return false;
        }
        if (item.children && item.children.length > 0) {
            item.children = routerFilter(item.children);
        }
        return true;
    });
};

const permissionsFilterRouter = (router, roles) => {
    return router.filter(route => {
        if (!route.meta.roles) {
            return true;
        }
        if (roles.some(role => route.meta.roles.includes(role))) {
            if (route.children && route.children.length > 0) {
                route.children = permissionsFilterRouter(route.children, roles);
            }
            return true;
        }

        return false;
    });
};
export { permissionsFilterRouter, routerFilter };
