import Vue from 'vue';
import axios from 'axios';

import { secondsToTime } from '@/helpers/funcs/time';
import { capitalize } from '@/helpers/funcs/string';

import '@/assets/styles/main.sass';

import PIcon from '@/components/Base/PIcon.vue';
import PBtn from '@/components/Base/PBtn.vue';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
axios.defaults.baseURL = 'https://pomodoro-ketchup-vue.firebaseio.com';

// COMPONENTS
Vue.component('PIcon', PIcon);
Vue.component('PBtn', PBtn);

// FILTERS
Vue.filter('capitalize', capitalize);
Vue.filter('time', secondsToTime);

// DIRECTIVES
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

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#pomodoro-ketchup');
