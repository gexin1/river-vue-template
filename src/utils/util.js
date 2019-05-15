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
const trim = str => {
    if (str == undefined) {
        return undefined;
    }
    str = str.replace(/^\s*|\s*$/g, '');
    return str;
};

export { routerFilter, trim };
