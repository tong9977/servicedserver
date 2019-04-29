import Vue from 'vue';
import App from './App.vue';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// Components
import './components'

// Plugins
import './plugins'

// Sync router with store
import { sync } from 'vuex-router-sync'

// Application imports
import router from '@/router'
import store from '@/store'

// Sync store with router
sync(store, router)


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    themeColor: '#1D2939'
  }
}).$mount('#app');






