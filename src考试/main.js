// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/reset.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from '@/utils/request'
Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(Vant);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
