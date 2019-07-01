import { Modal } from 'iview';
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
    /* eslint-disable-next-line */ else
        return !keysArr1.some(key => obj1[key] != obj2[key]);
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

export {
    routerFilter,
    trim,
    getUnion,
    findNodeUpperByClasses,
    routeEqual,
    objEqual,
    showTitle,
    beforeClose
};
