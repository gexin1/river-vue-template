import axios from 'axios';
import { Notification } from 'element-ui';
import qs from 'qs';
import Vue from 'vue';

const that = Vue.prototype;

const request = axios.create({
    baseURL: process.env.VUE_APP_REQ_BASEURL_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
});

request.interceptors.request.use(
    config => {
        let { method, data } = config;

        if (['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
            if (
                typeof data === 'object' &&
                config['headers']['Content-Type'].includes(
                    'application/x-www-form-urlencoded'
                )
            ) {
                config.data = qs.stringify(data);
            }
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
            let { status, data } = response;
            if (status === 200 && data.f === 1) {
                return Promise.resolve(data);
            } else if ([65264, 65535].includes(data.f)) {
                that.$VM.$router.push({ path: '/login' });
                Notification({
                    title: '提示',
                    message: data.m,
                    type: 'warning'
                });
            } else {
                throw data;
            }
        } catch (error) {
            Notification.error({
                title: '错误',
                message: error.m || error
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
