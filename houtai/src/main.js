import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import vueCookies from 'vue-cookies'
Vue.config.productionTip = false
import 'element-ui/lib/theme-chalk/display.css'
import 'element-ui/lib/theme-chalk/index.css'
import ElSelectTree from 'el-select-tree';
 // import the component
 // import the styles
 import '@riophae/vue-treeselect/dist/vue-treeselect.css'
Vue.use(ElSelectTree);
Vue.use(vueCookies)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
