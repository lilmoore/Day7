import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    count: 0, 
    webcolor:"",
    user: null
  },
  mutations: {
      setCount: (state, count) => state.count = count,
      setWebcolor: (state, webcolor) => state.webcolor = webcolor,
      setUser: (state, user) => state.user = user,
  },
  getters: {
      getCount: (state) =>
      {
          return state.count
      },
      getWebcolor: (state) =>
      {
          return state.webcolor
      },
      getUser: (state) =>
      {
          return state.user
      }
  }
})
export default store;