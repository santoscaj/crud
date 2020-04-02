import Vue from 'vue' 
import Router from 'vue-router'

import Data from '@/components/Data.vue'

Vue.use(Router);

export default new Router({
    mode: 'hash',
    routes: [{
        path: '/user/:id',
        component: Data
    }]
})
