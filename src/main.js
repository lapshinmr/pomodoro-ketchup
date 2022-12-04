import Vue from 'vue';
import axios from 'axios';
import { secondsToTime } from '@/helpers/funcs/time';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.filter('capitalize', (value) => value.charAt(0).toUpperCase() + value.slice(1));

Vue.filter('time', secondsToTime);

Vue.directive('set-editable', {
  bind(el, binding) {
    el.onblur = () => {
      binding.value(el);
    };
    el.onkeydown = (event) => {
      if (event.keyCode === 13) {
        event.preventDefault();
        el.blur();
      }
    };
  },
});

axios.defaults.baseURL = 'https://pomodoro-ketchup-vue.firebaseio.com';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#pomodoro-ketchup');
