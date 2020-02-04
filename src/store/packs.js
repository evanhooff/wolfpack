import rest from '../api/rest';

const state = {
  allPacks: null
}

const getters = {
  allWolves: state => {
    return state.allPacks;
  }
}

const actions = {
  getAllPacks: store => {
    rest.getPacks('/packs').then(packs => {
      store.commit('setAllPacks', packs);
    });
  }
}

const mutations = {
  setAllPacks(state, packs) {
    state.allPacks = packs;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};