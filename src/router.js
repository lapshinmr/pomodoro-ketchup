import Vue from 'vue'
import Router from 'vue-router'
import Timer from './views/Timer.vue'
import Statistic from './views/Statistic.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'timer',
      component: Timer
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: Statistic
    }
  ]
})
