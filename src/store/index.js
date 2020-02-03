import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import testApiGetter from './testApiGetter';

export default new Vuex.Store({
  modules: {
    testApiGetter
  }
});