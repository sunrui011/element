import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//引入全局样式表
import './assets/css/global.css'
//引入login-icon样式表
import './assets/login-icon/iconfont.css'
import './assets/home-left-icon/iconfont.css'
//先导入axios包
// import axios from 'axios'
// 然后把axios挂载到原型上去
// Vue.prototype.$http = axios//每一个vue组件都可以通过$http去发起请求
// 配置请求的根路径
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'4
// 引入mock文件
// import Mock from 'mock.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
