import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const REFRESH_TIME = 1000;
const POMODORO_DEFAULT = 10;


export default new Vuex.Store({
  state: {
    initTime: 0,
    curTime: 0,
    endTime: null,
    timerId: null,
    pomodoros: 0
  },
  mutations: {
    'SET_INIT_TIME'(state, seconds) {
      state.initTime = seconds
    },
    'SET_TIME'(state, seconds) {
      state.curTime = seconds;
    },
    'SET_END_TIME'(state) {
      state.endTime = Date.now() + state.curTime * REFRESH_TIME;
    },
    'DECREASE_TIME'(state) {
      state.curTime -= REFRESH_TIME / 1000
    },
    'SET_TIMER_ID'(state, timerId) {
      state.timerId = timerId
    },
    'RESET_TIMER_ID'(state) {
      clearInterval(state.timerId);
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
    setInitTime({commit}, seconds) {
      let initTime;
      if (!seconds) {
        initTime = localStorage.getItem('initTime') || POMODORO_DEFAULT;
      }
      commit('SET_INIT_TIME', initTime);
    },
    setTime({commit, state}, seconds) {
      if (!seconds) {
        seconds = state.initTime
      }
      commit('SET_TIME', seconds)
    },
    runTimer({commit, state}) {
      if (state.timerId || state.curTime === 0) {
        console.log('+')
        return
      }
      commit('SET_END_TIME');
      let timerId = setInterval(() => {
        if ( state.endTime <= Date.now() && state.timerId ) {
          clearInterval(state.timerId);
          commit('SET_TIME', 0);
          commit('RESET_TIMER_ID');
          commit('ADD_POMODORO');
          if (Notification.permission === 'granted') {
            new Notification('Time is over', {
              body: 'Well done!'
            });
          }
        } else {
          commit('DECREASE_TIME')
        }
      }, REFRESH_TIME);
      commit('SET_TIMER_ID', timerId)
    },
    pauseTimer({commit}) {
      commit('RESET_TIMER_ID')
    },
    resetTimer({commit, dispatch}) {
      commit('RESET_TIMER_ID');
      dispatch('setTime')
    }
  },
  getters: {
    getInitTimeSeconds(state) {
      return state.initTime
    },
    getTimeSeconds(state) {
      return state.curTime
    },
    getTimeFormatted(state) {
      let minutes = Math.floor(state.curTime / 60);
      let seconds = Math.floor(state.curTime - minutes * 60);
      return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }
  }
})
