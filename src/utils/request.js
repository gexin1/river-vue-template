import axios from 'axios';
import { Notice } from 'iview';
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
            let { status, data } = response;
            if (status === 200 && data.f === 1) {
                return Promise.resolve(data);
            } else if ([65264, 65535].includes(data.f)) {
                //如果 状态为 就去登录
                that.$VM.$router.push({ path: '/login' });

                Notice.warning({
                    title: '提示',
                    desc: data.m
                });
            } else {
                throw data;
            }
        } catch (error) {
            Notice.error({
                title: '错误',
                desc: error.m || error
            });
            return Promise.reject(error);
        }
    },
    error => {
        Notice.error({
            title: '错误',
            desc: error.m || error
        });
        return Promise.reject(error);
    }
);

export default request;
