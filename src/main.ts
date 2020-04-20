import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
// import VueMask from 'v-mask'
import { VueMaskDirective } from 'v-mask'

Vue.directive('mask', VueMaskDirective);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


