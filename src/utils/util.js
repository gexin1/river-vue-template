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

export { routerFilter, trim, getUnion, findNodeUpperByClasses };
