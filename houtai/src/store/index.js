
import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)
import login from '@/store/login'
import user from '@/store/user'
export default new vuex.Store({ 
    state: {
      collapse: false
    },
    getters: {
    },
    mutations: {
      setCollapse(state, val) {
        state.collapse = val
      }
    },
    actions: {
    },
    modules: {
      login,
      user
    }
  })