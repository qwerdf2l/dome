import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)
import Layout from '@/views/Layout'

// 引入仓库
import store from '@/store'

const router = new vueRouter({
    mode: 'hash',
    routes: [ 
        {
            path: '/login',
            component: () => import('@/views/Login')
        },
        {
            path: '/',
            redirect: '/dashboard',
            component: Layout,
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Layout/Dashboard')
                },
                
            ]
        }
    ]
})

// 拦截
const whiteList= ['/login']
router.beforeEach((to, from, next) => {
    if ( whiteList.indexOf(to.path) > -1 ) {
        next()
    } else {
        
        // 判断是否登录
        if ( sessionStorage.getItem('token') !=null) {
            // 加载所有的菜单 
            if (store.state.login.menus.length == 0) {
                store.dispatch('login/searchMenus').then( menulist => {
                    const routeList =  changeMenusToRoutes(menulist)    

                    // 把 routelist添加到路由对象
                    router.addRoutes(routeList)    

                    next({...to, replace:true})

                }) 
            }
            next()
            
        } else {
            // 拦截
            next('/login')
        }
    }
})
// 转换成路由对应的组件
function changeMenusToRoutes(menus) {
    return menus.filter( item => {
        
        item.component = asyncComponent(item.component)
        if (item.children && item.children.length > 0) {
            changeMenusToRoutes(item.children)
        }
        return item
    })
}
// 转成动态异步组件
function asyncComponent(path) {
    
    // if (path != '/system') {
    //     console.log('/system/'+path)
    //     return () => import(`@/views${ '/system/'+path}`)
    // } else {
    //     console.log(path)
    //     return () => import(`@/views${path}`)
    // }
    // if (path !='/system') {
    //     return () => import(`@/views${ '/system/'+ path}`)
    // } else {
    //     return () => import(`@/views/Layout`)
    // }
    return () => import(`@/views/${ path }`)
    
}


const originalPush = vueRouter.prototype.push;
vueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};


export default router