import Vue from 'vue'
// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Language (i18n)
import locale from 'element-ui/lib/locale/lang/en'
import i18n from './lang'
// Global css
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
// icon
import '@/icons'
// Permission control
import '@/permission'
import ClickControl from '@/directives/click-control'
// Simulation data
/**
 * This project originally used easy-mock to simulate data,
 * but its official service is very unstable,
 * and you can build your own service if you need it.
 * So here I use Mock.js for local emulation,
 * it will intercept your request, so you won't see the request in the network.
 * If you remove `../mock` it will automatically request easy-mock data.
 */
// import '../mock'

Vue.use(ElementUI, { locale })
Vue.use(ClickControl)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
