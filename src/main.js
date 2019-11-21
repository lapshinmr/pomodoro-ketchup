import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store';
import { secondsToTime } from './store';
import './registerServiceWorker';

Vue.config.productionTip = false

Vue.filter('capitalize', (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('seconds-to-time', secondsToTime);

Vue.directive('set-editable', {
  bind(el, binding, vnode) {
    el.onblur = () => {
      binding.value(el)
    };
    el.onkeydown = function(event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        el.blur()
      }
    }
  }
})

axios.defaults.baseURL = 'https://pomodoro-ketchup-vue.firebaseio.com';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#pomodoro-ketchup')
