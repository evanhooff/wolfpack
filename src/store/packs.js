import rest from '../api/rest';

const state = {
  allPacks: null,
  selectedPack: null
}

const getters = {
  allPacks: state => {
    return state.allPacks;
  },
  selectedPack: state => {
    return state.selectedPack;
  }
}

const actions = {
  getAllPacks: store => {
    rest.getPacks().then(packs => {
      store.commit('setAllPacks', packs);
    });
  },
  getPack: (store, id) => {
    rest.getPack(id).then(pack => {
      store.commit('setSelectedPack', pack);
    });
  }
}

const mutations = {
  setAllPacks(state, packs) {
    state.allPacks = packs;
  },
  setSelectedPack(state, pack) {
    state.selectedPack = pack;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};