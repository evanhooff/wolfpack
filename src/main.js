import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

Vue.config.productionTip = false;

const getBaseUrl = () => {
  return "https://join.wolfpackit.nl"
}

axios.defaults.headers.common['Authorization'] = 'Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 5000
});

axiosInstance.get('').catch(err => {
  err;
})

new Vue({
  render: h => h(App)
}).$mount('#app');