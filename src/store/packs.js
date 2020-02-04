import rest from '../api/rest';

const state = {
  packLoading: true,
  allPacks: null,
  selectedPack: null
}

const getters = {
  loading: state => {
    return state.packLoading;
  },
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
      store.commit('setLoadingState', false);
      store.commit('setSelectedPack', pack);
    });
  }
}

const mutations = {
  setLoadingState(state, isLoading) {
    state.packLoading = isLoading;
  },
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