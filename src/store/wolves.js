import rest from '../api/rest';

const state = {
  isLoading: true,
  allWolves: null
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
    let allData = wolves.map((wolf) => {
      wolf.value = wolf.id;
      wolf.text = wolf.name;
      return wolf;
    });
    state.allWolves = allData.reverse();
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
};