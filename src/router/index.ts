import Vue from 'vue' 
import Router from 'vue-router'

import Data from '@/components/Data.vue'

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [
        {
        path: '/home/',
        name: 'home',
        component: Data
        },
        {
        path: '/user/:id',
        name: 'home/user',
        component: Data
        },
    ]
})
