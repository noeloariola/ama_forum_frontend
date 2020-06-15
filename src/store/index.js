import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setAccount (state, user) {
      state.user = user
    },
  },
  actions: {
    
  },
  getters: {
    user: state => state.user,
  },
  modules: {

  }
})
