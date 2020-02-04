import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import wolves from './wolves';
import packs from './packs';

export default new Vuex.Store({
  modules: {
    wolves,
    packs
  }
});