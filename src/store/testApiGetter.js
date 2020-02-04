import rest from '../api/rest';

const state = {
  testVariable: "this is a test variable"
}

const getters = {
  getTestVariable: state => {
    return state.testVariable;
  }
}

const actions = {
  testDefaultApiCall() {
    rest.getWolves();
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
};