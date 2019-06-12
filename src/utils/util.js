/**
 * 去除首位空格
 * @param {*} str
 */
const trim = str => {
    if (str == undefined) {
        return undefined;
    }
    str = str.replace(/^\s*|\s*$/g, '');
    return str;
};

/**
 * 检查一个值是否为空
 * @param {*} value
 * @returns {Boolean}
 */
function isEmpty(value) {
    if (Array.isArray(value)) {
        return value.length === 0;
    } else if (typeof value === 'object') {
        if (value) {
            for (const _ in value) {
                return false;
            }
        }
        return true;
    } else {
        return !value;
    }
}
export { trim, isEmpty };
