import Vue from 'vue';
import Router from 'vue-router';
import MainView from '@/views/MainView.vue';
import StatisticView from '@/views/StatisticView.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'timer',
      component: MainView,
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: StatisticView,
    },
  ],
});
