import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'
import modules from './modules'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  actions,
  mutations,
  modules,
  strict: debug,
})