import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const REFRESH_TIME = 1000;
const POMODORO_DEFAULT = 10;
const POMODOROS_GOAL_DEFAULT = 13;


export default new Vuex.Store({
  state: {
    initTime: 0,
    curTime: 0,
    endTime: null,
    timerId: null,
    pomodoros: 0,
    pomodorosGoal: 0
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
      state.timerId = null
    },
    'SET_POMODOROS'(state, pomodoros) {
      state.pomodoros = pomodoros;
    },
    'ADD_POMODORO'(state) {
      state.pomodoros += 1
    },
    'REMOVE_POMODORO'(state) {
      if (state.pomodoros > 0) {
        state.pomodoros -= 1
      }
    },
    'SET_POMODOROS_GOAL'(state, number) {
      state.pomodorosGoal = number
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
    setPomodorosGoal({commit}, number) {
      let pomodorosGoal;
      if (!number) {
        pomodorosGoal = localStorage.getItem('pomodorosGoal') || POMODOROS_GOAL_DEFAULT;
      }
      commit('SET_POMODOROS_GOAL', pomodorosGoal);
    },
    setTime({commit, state}, seconds) {
      if (!seconds) {
        seconds = state.initTime
      }
      commit('SET_TIME', seconds)
    },
    runTimer({commit, state}) {
      if (state.timerId || state.curTime === 0) {
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
    pauseTimer({commit, state}) {
      clearInterval(state.timerId);
      commit('RESET_TIMER_ID')
    },
    resetTimer({commit, state, dispatch}) {
      clearInterval(state.timerId);
      commit('RESET_TIMER_ID');
      dispatch('setTime')
    },
    loadPomodoros({commit}) {
      let pomodoros = Number(localStorage.getItem('pomodoros') || 0);
      commit('SET_POMODOROS', pomodoros)
    },
    setPomodoros({commit, state}, pomodoros) {
      commit('SET_POMODOROS', pomodoros);
      localStorage.setItem('pomodoros', state.pomodoros)
    },
    addPomodoro({commit, state}) {
      commit('ADD_POMODORO');
      localStorage.setItem('pomodoros', state.pomodoros)
    },
    removePomodoro({commit, state}) {
      commit('REMOVE_POMODORO');
      localStorage.setItem('pomodoros', state.pomodoros)
    },
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
