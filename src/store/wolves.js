import rest from '../api/rest';

const state = {
  isLoading: true,
  error: false,
  allWolves: []
}

const getters = {
  allWolves: state => {
    let reversedWolves = state.allWolves.reverse();
    return reversedWolves.map((wolf) => {
      wolf.value = wolf.id;
      wolf.text = wolf.name;
      return wolf;
    });
  }
}

const actions = {
  getAllWolves: store => {
    store.commit('setLoadingState', true);
    rest.getWolves().then(wolves => {
      store.commit('setAllWolves', wolves);
      store.commit('setLoadingState', false);
    }).catch(error => {
      // set selected pack to undefined
      store.commit('setAllWolves', undefined);
      store.commit('setErrorState', error);
    });
  }
}

const mutations = {
  setLoadingState(state, isLoading) {
    state.isLoading = isLoading;
  },
  setErrorState(state, error) {
    state.error = error;
  },
  setAllWolves(state, wolves) {
    if (wolves) state.allWolves = wolves;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};