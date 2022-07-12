export default {
   namespaced: true,
   state: {
      userStatus: [],
      userMenu: [],
      userData: [],
   },
   getters: {
   },
   mutations: {
      setUserStatus(state, val) {
         state.userStatus = val
      },
      setUserMenu(state, val) {
         state.userMenu = val
      },
      setUserData(state, val) {
         state.userData = val
      }
   },
   actions: {
      // // 按钮权限
      // getUserStatus(context) {
      //    return new Promise(resovle => {
      //       mygetUserStatus().then(res => {
      //          context.commit('setUserStatus', res)
      //          resovle(res)
      //       })
      //    })
      // },
      // // 菜单列表
      // getMenu(context) {
      //    return new Promise(resovle => {
      //       mygetMenu().then(res => {
      //          context.commit('setUserMenu', res)
      //          resovle(res)
      //       })
      //    })
      // },
      // // 用户列表
      // getUserData(context) {
      //    return new Promise(resovle => {
      //       mygetUserData().then(res => {
      //          context.commit('setUserData', res)
      //          resovle(res)
      //       })
      //    })
      // }
   },
   modules: {

   }
}