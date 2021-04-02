// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//引入模块
// import io from './components/socket.io/weapp.socket.io'
// Vue.prototype.socket =io('http://localhost:8082')

import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  // 服务器端地址
  connection: 'http://localhost:8082',
  vuex: {
  }
}))

import { Search } from 'vant';
import { Badge } from 'vant';
Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Search)
Vue.use(Badge)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
