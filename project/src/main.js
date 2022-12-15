import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import Axios from 'axios'
//import {APIService} from './api/api'
//import AxiosProvider from './api/axios.provider'

//const axiosProvider = new AxiosProvider('http://localhost:3000')

//Vue.prototype.$api = new APIService(axiosProvider)




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
