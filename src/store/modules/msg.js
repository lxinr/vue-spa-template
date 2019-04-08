import { MSG_TITLE } from '@src/store/mutation-types'

const state = {
  msgTit: '标题'
}

const mutations = {
  [MSG_TITLE](state, tit) {
    state.msgTit = tit
  }
}

const getters = {
  msgTit: state => state.msgTit
}

const actions = {

}

export default {
  // 增加命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}