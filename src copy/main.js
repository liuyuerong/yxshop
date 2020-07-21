// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "@/store/index"
import axios from '@/utils/request'
Vue.prototype.$axios=axios
// 引入vant 
import Vant from 'vant';
import 'vant/lib/index.css';
import "@/assets/style/reset.css";
Vue.use(Vant);
Vue.config.productionTip = false
// 全局路由守卫，进入to组件之前
router.beforeEach((to,from,next)=>{
  // console.log(to)
  // 判断路由是否设置
 if(to.hasOwnProperty("meta")){
   document.title=to.meta.title
 }
next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
