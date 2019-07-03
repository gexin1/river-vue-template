import axios from 'axios';
import { Notification } from 'element-ui';
import qs from 'qs';

const request = axios.create({
    timeout: 10000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: false
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
            const { status, data } = response;

            if (status !== 200) {
                throw 'status error';
            }
            if (data.s === 1) {
                return Promise.resolve(data);
            } else {
                throw data;
            }
        } catch (error) {
            Notification.error({
                title: '错误',
                message: error.m || error.message || error
            });
            return Promise.reject(error);
        }
    },
    error => {
        Notification.error({
            title: '错误',
            message: error.m || error
        });
        return Promise.reject(error);
    }
);
export default request;
