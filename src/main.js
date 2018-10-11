import Vue from 'vue'
import App from './App.vue'
import index from './components/index.vue'
import detail from './components/detail.vue'

//引用elment插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//应用懒加载插件
import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  // preLoad: 1.3,
  error: 'dist/error.png',
  loading: './assets/imges/loading.gif',
  attempt: 1
})

// 引入axios插件
import axios from "axios";
Vue.prototype.$axios=axios;

//设置请求及地址
axios.defaults.baseURL = "http://111.230.232.110:8899";

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
},
{
  path:'/detail/:goodID',
  component:detail
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