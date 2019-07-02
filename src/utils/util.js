import { Modal } from 'iview';

const trim = str => {
    if (str == undefined) {
        return undefined;
    }
    str = str.replace(/^\s*|\s*$/g, '');
    return str;
};
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
const getUnion = (arr1, arr2) => {
    return Array.from(new Set([...arr1, ...arr2]));
};

const findNodeUpperByClasses = (ele, classes) => {
    let parentNode = ele.parentNode;
    if (parentNode) {
        let classList = parentNode.classList;
        if (
            classList &&
            classes.every(className => classList.contains(className))
        ) {
            return parentNode;
        } else {
            return findNodeUpperByClasses(parentNode, classes);
        }
    }
};

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
const objEqual = (obj1, obj2) => {
    const keysArr1 = Object.keys(obj1);
    const keysArr2 = Object.keys(obj2);
    if (keysArr1.length !== keysArr2.length) return false;
    else if (keysArr1.length === 0 && keysArr2.length === 0) return true;
    else return !keysArr1.some(key => obj1[key] != obj2[key]);
};

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
const routeEqual = (route1, route2) => {
    const params1 = route1.params || {};
    const params2 = route2.params || {};
    const query1 = route1.query || {};
    const query2 = route2.query || {};
    return (
        route1.name === route2.name &&
        objEqual(params1, params2) &&
        objEqual(query1, query2)
    );
};

const showTitle = (item, vm) => {
    let { title, __titleIsFunction__ } = item.meta;
    if (!title) return;
    if (useI18n) {
        if (title.includes('{{') && title.includes('}}') && useI18n)
            title = title.replace(/({{[\s\S]+?}})/, (m, str) =>
                str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim()))
            );
        else if (__titleIsFunction__) title = item.meta.title;
        else title = vm.$t(item.name);
    } else title = (item.meta && item.meta.title) || item.name;
    return title;
};

const beforeClose = {
    before_close_normal: resolve => {
        Modal.confirm({
            title: '确定要关闭这一页吗',
            onOk: () => {
                resolve(true);
            },
            onCancel: () => {
                resolve(false);
            }
        });
    }
};
/**
 * 计算路由过滤掉隐藏的路由
 * @param {*} routerList
 */
const calcRouter = (routerList, flags = ['sideHide']) => {
    return routerList.filter(item => {
        while (true) {
            if (!item.meta) {
                break;
            }
            let metaKeys = Object.keys(item.meta);
            if (flags.some(key => metaKeys.includes(key) && item.meta[key])) {
                return false;
            }
            break;
        }
        if (item.children && item.children.length > 0) {
            item.children = calcRouter(item.children, flags);
        }
        return true;
    });
};

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
const findNameRoute = (routers, homeName = 'home') => {
    let i = -1;
    let len = routers.length;
    let homeRoute = {};
    while (++i < len) {
        let item = routers[i];
        if (item.children && item.children.length) {
            let res = findNameRoute(item.children, homeName);
            if (res.name) return res;
        } else {
            if (item.name === homeName) homeRoute = item;
        }
    }
    return homeRoute;
};

const calcBreadcrumb = router => {};
export {
    calcRouter,
    trim,
    getUnion,
    findNodeUpperByClasses,
    routeEqual,
    objEqual,
    showTitle,
    beforeClose,
    findNameRoute
};
