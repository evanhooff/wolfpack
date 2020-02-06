import rest from '../api/rest';

const state = {
  packLoading: true,
  error: false,
  allPacks: null,
  selectedPack: null
}

const getters = {
  allPacks: state => {
    if (state.allPacks) {
      return state.allPacks.map(pack => {
        let position = {};
        position.lat = pack.lat;
        position.lng = pack.lng;
        pack.position = position;
        return pack;
      });
    }
    return [];
  },
  selectedPack: state => {
    let reversedWolves = state.selectedPack;
    reversedWolves.wolves = reversedWolves.wolves.reverse();
    return reversedWolves;
  }
}

const actions = {
  getAllPacks: store => {
    rest.getPacks().then(packs => {
      store.commit('setAllPacks', packs);
    });
  },
  getPack: (store, id) => {
    if (id) {
      store.commit('setLoadingState', true);
      rest.getPack(id).then(pack => {
        store.commit('setLoadingState', false);
        store.commit('setSelectedPack', pack);
      }).catch(error => {
        // set selected pack to undefined
        store.commit('setSelectedPack', undefined);
        store.commit('setErrorState', error);
      });
    } else {
      store.commit('setSelectedPack', undefined);
    }
  }
}

const mutations = {
  setLoadingState(state, isLoading) {
    state.packLoading = isLoading;
  },
  setErrorState(state, error) {
    state.error = error;
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