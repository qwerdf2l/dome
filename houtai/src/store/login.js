
import {getMenus} from '@/api/login'
export default {
  namespaced: true,
  state: {
    user: [{}],
    menus: []
  },
  getters: {
  },
  mutations: {
    setUser(state, val) {
        state.user = val
    },
    setMenus(state, val) {
        state.menus = val
    } 
  },
  actions: {
    searchMenus(context) {
        return new Promise( resovle => {
            getMenus().then( res => {
                context.commit('setMenus', res.slice(0,1))
                resovle(res.slice(0,1))
            })
        } )
    }
  }
}