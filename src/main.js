import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from "./router";

// css
import {
  BootstrapVue
} from 'bootstrap-vue';
import "./sass/base.scss";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');