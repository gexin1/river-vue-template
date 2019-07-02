import axios from 'axios';
import { Notification } from 'element-ui';
import qs from 'qs';

const request = axios.create({
    timeout: 30000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
});

request.interceptors.request.use(
    config => {
        let { method, data } = config;
        const contentType = config['headers']['Content-Type'];
        while (true) {
            if (!['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
                break;
            }

            if (typeof data !== 'object') {
                break;
            }
            if (contentType.includes('application/x-www-form-urlencoded')) {
                config.data = qs.stringify(data);
                break;
            }
            if (contentType.includes('application/json')) {
                config.data = data;
                break;
            }
            break;
        }

        return config;
    },
    error => {
        Promise.reject(error);
    }
);

request.interceptors.response.use(
    response => {
        try {
            const { status, data, code } = response;
            if (data.aaData) {
                return Promise.resolve(data.aaData);
            }
            if (status !== 200) {
                throw 'status error';
            }
            if (data.success || data.code === 200) {
                return Promise.resolve(data);
            } else {
                throw data;
            }
        } catch (error) {
            Notification.error({
                title: '错误',
                message: error.msg || error.message || error
            });
            return Promise.reject(error);
        }
    },
    error => {
        Notification.error({
            title: '错误',
            message: error.msg || error
        });
        return Promise.reject(error);
    }
);
export default request;
