import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    annotation: {
      type: '',
      color: '',
    },
  },
  mutations: {
    setAnnotationType(state, value) {
      state.annotation.type = value
    },
    setAnnotationColor(state, value) {
      state.annotation.color = value
    },
  },
  actions: {
    setAnnotationType({ commit }, value) {
      commit('setAnnotationType', value)
    },
    setAnnotationColor({ commit }, value) {
      commit('setAnnotationColor', value)
    },
  },
});
