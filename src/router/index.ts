import Vue from 'vue';
import Router from 'vue-router';

import Data from '@/components/Data.vue';

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: { name: 'user', params: {id: 'new'} },
            component: Data,
        },
        {
        path: '/user/:id',
        name: 'user',
        component: Data,
        },
    ],
});
