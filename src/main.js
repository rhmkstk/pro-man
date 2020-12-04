import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import './styles/app.css'

Vue.config.productionTip = true

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
