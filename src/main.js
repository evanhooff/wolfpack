import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from "./router";
import * as VueGoogleMaps from "vue2-google-maps";

// css
import {
  BootstrapVue
} from 'bootstrap-vue';
import "./sass/base.scss";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyB9e1epmURGsl25pVJc2BzjgbZ1OqF6Ii8",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');