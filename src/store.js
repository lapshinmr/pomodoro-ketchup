import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curTime: 0,
    timerId: null,
    pomodoros: 0
  },
  mutations: {
    'SET_TIME'(state, seconds) {
      state.curTime = seconds
    },
    'DECREASE_TIME'(state) {
      state.curTime -= 1
    },
    'SET_TIMER_ID'(state, timerId) {
      state.timerId = timerId
    },
    'RESET_TIMER_ID'(state) {
      state.timerId = null
    },
    'ADD_POMODORO'(state) {
      state.pomodoros += 1
    },
    'REMOVE_POMODORO'(state) {
      state.pomodoros -= 1
    },
  },
  actions: {
    setTime({commit}, seconds) {
      if (!seconds) {
        seconds = localStorage.getItem('initTime') || 5;
      }
      commit('SET_TIME', seconds)
    },
    runTimer({commit, dispatch, state}) {
      if (state.timerId) {
        return
      }
      let timerId = setInterval(() => {
        if ( state.curTime <= 0 && state.timerId ) {
          clearInterval(state.timerId)
          state.pomodoros += 1
          dispatch('stopTimer')
        } else {
          commit('DECREASE_TIME')
        }
      }, 1000);
      commit('SET_TIMER_ID', timerId)
    },
    pauseTimer({commit, state}) {
      clearInterval(state.timerId);
      commit('RESET_TIMER_ID')
    },
    stopTimer({commit, dispatch, state}) {
      clearInterval(state.timerId);
      commit('RESET_TIMER_ID');
      dispatch('setTime')
    }
  },
  getters: {
    getTimeSeconds(state) {
      return state.curTime
    },
    getTimeFormatted(state) {
      let minutes = Math.floor(state.curTime / 60);
      let seconds = state.curTime - minutes * 60;
      return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
})
