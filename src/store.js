import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  bottomFlag:true
}
const getters = {
  bottomFlag:state => state.bottomFlag
}
const mutations = {
  setBottomFlag: (state, flag) => {
    state.bottomFlag = flag
    console.log(state)
  }
}
const actions = {
  toSetBottom({ commit }, flag) {
    commit('setBottomFlag',flag)
  }
}
export default new Vuex.Store({
  getters,mutations,actions,state
})