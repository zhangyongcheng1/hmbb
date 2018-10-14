import Vue from 'vue'
import App from './App.vue'
import index from './components/index.vue'
import detail from './components/detail.vue'
//动态效果
import './assets/statics/cavars.js'

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
  loading: require('./assets/imges/loading.gif'),
  // attempt: 1
})

// 引入axios插件
import axios from "axios";
Vue.prototype.$axios = axios;

//设置请求及地址
axios.defaults.baseURL = "http://111.230.232.110:8899";

//引入moment插件
import moment from "moment";
//全局过滤器
Vue.filter('capitalize', function (value, str1, str2, str3, str4) {
  // console.log(value)
  return moment(value).format("YYYY" + str1 + "MM" + str2 + "DD" + str3 + str4);
})

//引入vuex插件
import Vuex from 'vuex'

Vue.use(Vuex)
//实例化vuex数据仓库
const store = new Vuex.Store({
  state: {
    addshopData:JSON.parse(localStorage.getItem(history))||{}
  },
  mutations: {
    //   increment (state) {
    //     state.count++
    //   }
    addshop(state, shapcarData) {
      //声明需要存放的商品数据({id,count})
      if (state.addshopData[shapcarData.id] == undefined) {
        // state.addshopData[shapcarData.id] = shapcarData.id;
        //数据变更时需要
        Vue.set(state.addshopData, shapcarData.id, shapcarData.count);
      } else {
        state.addshopData[shapcarData.id] += shapcarData.count;
      }

    }
  },
  getters: {
    shopcarCount(state) {
      let getter=0;
      for (const key in state.addshopData) {
       getter+=state.addshopData[key]
        }
      return getter
      }
    }

})

//引用放大镜插件
import ProductZoomer from 'vue-product-zoomer'

Vue.use(ProductZoomer)

//引用iview插件
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);

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
    path: '/detail/:goodID',
    component: detail
  }
]
//创建路由实例
const router = new vueRouter({
  routes
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂载到vue实例上
  router,
  store
}).$mount('#app')

//当浏览器关闭时保存购物车数据到localstorage
window.onbeforeunload=function(){
  localStorage.setItem('history',JSON.stringify(store.state.addshopData))
}