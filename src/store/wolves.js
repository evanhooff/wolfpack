import rest from '../api/rest';

const state = {
  isLoading: true,
  allWolves: null
}

const getters = {
  allWolves: state => {
    let reversedWolves = state.allWolves.reverse();
    return reversedWolves;
  }
}

const actions = {
  getAllWolves: store => {
    store.commit('setLoadingState', true);
    rest.getWolves().then(wolves => {
      store.commit('setAllWolves', wolves);
      store.commit('setLoadingState', false);
    });
  }
}

const mutations = {
  setLoadingState(state, isLoading) {
    state.isLoading = isLoading;
  },
  setAllWolves(state, wolves) {
    state.allWolves = wolves.map((wolf) => {
      wolf.value = wolf.id;
      wolf.text = wolf.name;
      return wolf;
    });
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};