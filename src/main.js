import Vue from 'vue';
import App from './App.vue';
import rest from './api/rest';

Vue.config.productionTip = false;

rest.getBase();

new Vue({
  render: h => h(App)
}).$mount('#app');