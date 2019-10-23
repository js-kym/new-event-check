import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import VueJsonp from 'vue-jsonp';

Vue.use(VueJsonp);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
