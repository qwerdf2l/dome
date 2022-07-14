import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import login from './login'
import role from "./role"

export default new Vuex.Store({
  state: {
    collapse:false
  },
  getters: {
  },
  mutations: {
    setCollapse(state,val){
      console.log(val);
        state.collapse =val
    } 
  },
  actions: {
  },
  modules: {
    login,
    role
  }
})
