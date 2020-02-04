import rest from '../api/rest';

const state = {
  allWolves: null
}

const getters = {
  allWolves: state => {
    return state.allWolves;
  }
}

const actions = {
  getAllWolves: store => {
    rest.getWolves('/wolves').then(wolves => {
      store.commit('setAllWolves', wolves);
    });
  }
}

const mutations = {
  setAllWolves(state, wolves) {
    state.allWolves = wolves;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};