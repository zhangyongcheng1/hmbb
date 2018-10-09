import Vue from 'vue'
import App from './App.vue'
import index from './components/index.vue'

// 引入vue-router
import vueRouter from 'vue-router'
//use一下
Vue.use(vueRouter);
//创建路由规则
const routes = [{
  path: '/',
  component: index
},
{
  path: '/index',
  component: index
}]
//创建路由实例
const router = new vueRouter({
  routes
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂载到vue实例上
  router
}).$mount('#app')