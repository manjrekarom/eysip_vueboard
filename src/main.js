import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {localStorageManager} from './assets/js/LocalstorageManager'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueLodash, { lodash: lodash })

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBtB-QxWU8LEtlDwwnzLL9t5B_lPZojdy0',
    libraries: 'places',
  },
})

Vue.prototype.$localStorageManager = new localStorageManager()

const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
      get() {
          return EventBus;
      }
  }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
