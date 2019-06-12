import Vue from 'vue';
import Router from 'vue-router';
import hooks from './hooks';
import constantRouterMap from './constantRouterMap';
Vue.use(Router);

const router = new Router({
    routes: constantRouterMap
});

hooks(router);

export default router;
