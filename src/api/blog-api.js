//文章
import request from '@/utils/request';

const baseUrl = 'https://riverxin.cn/blog-hexo-back';
const url = {
    list: `${baseUrl}/article-list`,
    edit: `${baseUrl}/article-edit`,
    detail: `${baseUrl}/article-detail`,
    delete: `${baseUrl}/article-delete`,
    release: `${baseUrl}/article-release`
};
const getArticleList = () => request.get(url.list);
const getArticleDetail = fileName =>
    request.get(url.detail, {
        params: {
            fileName
        }
    });
const articleEdit = data => request.post(url.edit, data);
const articleDelete = fileName =>
    request.get(url.delete, {
        params: {
            fileName
        }
    });
const articleRelease = () =>
    request.get(url.release, {
        timeout: 100000
    });
export {
    getArticleList,
    getArticleDetail,
    articleEdit,
    articleDelete,
    articleRelease
};
