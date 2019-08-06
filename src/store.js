import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const REFRESH_TIME = 1000;
const POMODORO_DEFAULT = 25 * 60;
const POMODOROS_GOAL_DEFAULT = 70;
const GOAL_INDICATOR_FORMAT_DEFAULT = 2;
const NOTIFICATION_TITLE = 'Time is over.';
const NOTIFICATION_BODY = 'Well done!';

function get(key, parse=false) {
  if (parse) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return localStorage.getItem(key);
  }
}

export default new Vuex.Store({
  state: {
    initTime: 0,
    curTime: 0,
    endTime: null,
    timerId: null,
    pomodoros: 0,
    pomodorosGoal: 0,
    timerTitle: true,
    goalIndicatorFormat: 0,
    reversedProgressBar: false,
    notificationTitle: '',
    notificationBody: ''
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
    'SET_TIMER_TITLE'(state, flag) {
      state.timerTitle = flag
    },
    'SWITCH_TIMER_TITLE'(state) {
      state.timerTitle = !state.timerTitle
    },
    'SET_GOAL_INDICATOR_FORMAT'(state, value) {
      state.goalIndicatorFormat = value
    },
    'SWITCH_PROGRESS_BAR'(state) {
      state.reversedProgressBar = !state.reversedProgressBar
    },
    'SET_PROGRESS_BAR'(state, value) {
      state.reversedProgressBar = value
    },
    'SET_NOTIFICATION_TITLE'(state, value) {
      state.notificationTitle = value
    },
    'SET_NOTIFICATION_BODY'(state, value) {
      state.notificationBody = value
    },
  },
  actions: {
    setInitTime({commit}, seconds) {
      let initTime;
      if (!seconds) {
        initTime = JSON.parse(localStorage.getItem('initTime')) || POMODORO_DEFAULT;
      } else {
        initTime = seconds;
        localStorage.setItem('initTime', seconds)
      }
      commit('SET_INIT_TIME', initTime);
    },
    setPomodorosGoal({commit}, number) {
      let pomodorosGoal;
      if (!number) {
        pomodorosGoal = JSON.parse(localStorage.getItem('pomodorosGoal')) || POMODOROS_GOAL_DEFAULT;
      } else {
        pomodorosGoal = number;
        localStorage.setItem('pomodorosGoal', number)
      }
      commit('SET_POMODOROS_GOAL', pomodorosGoal);
    },
    loadVars({commit, dispatch}) {
      let timerTitle = get('timerTitle', true) || true;
      let pomodoros = get('pomodoros', true) || 0;
      let goalIndicatorFormat = get('goalIndicatorFormat', true) || GOAL_INDICATOR_FORMAT_DEFAULT;
      let reversedProgressBar = get('reversedProgressBar', true) || false;
      let notificationTitle = get('notificationTitle') || NOTIFICATION_TITLE;
      let notificationBody = get('notificationBody') || NOTIFICATION_BODY;
      let endTime = get('endTime') || Date.now();
      commit('SET_TIMER_TITLE', timerTitle);
      commit('SET_POMODOROS', pomodoros);
      commit('SET_GOAL_INDICATOR_FORMAT', goalIndicatorFormat);
      commit('SET_PROGRESS_BAR', reversedProgressBar);
      commit('SET_NOTIFICATION_TITLE', notificationTitle);
      commit('SET_NOTIFICATION_BODY', notificationBody);
      let curTime = Math.floor((endTime - Date.now()) / 1000);
      if ( curTime > 0 ) {
        commit('SET_TIME', curTime);
        dispatch('runTimer')
      }
    },
    setTime({commit, state}, seconds) {
      if (!seconds) {
        seconds = state.initTime
      }
      commit('SET_TIME', seconds)
    },
    saveEndTime({commit, state}) {
      commit('SET_END_TIME');
      localStorage.setItem('endTime', state.endTime)
    },
    runTimer({commit, dispatch, state}) {
      if (state.timerId) {
        return
      } else if (!state.timeId && state.curTime === 0) {
        dispatch('setTime')
      }
      dispatch('saveEndTime');
      let timerId = setInterval(() => {
        if ( state.endTime <= Date.now() && state.timerId ) {
          clearInterval(state.timerId);
          commit('SET_TIME', 0);
          commit('RESET_TIMER_ID');
          dispatch('addPomodoro');
          if (Notification.permission === 'granted') {
            new Notification(state.notificationTitle, {
              body: state.notificationBody
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
    switchTimerTitle({commit, state}) {
      commit('SWITCH_TIMER_TITLE');
      localStorage.setItem('timerTitle', state.timerTitle)
    },
    setGoalIndicatorFormat({commit}, value) {
      commit('SET_GOAL_INDICATOR_FORMAT', value);
      localStorage.setItem('goalIndicatorFormat', value)
    },
    switchProgressBar({commit, state}) {
      commit('SWITCH_PROGRESS_BAR');
      localStorage.setItem('reversedProgressBar', state.reversedProgressBar)
    },
    setNotificationTitle({commit}, value) {
      commit('SET_NOTIFICATION_TITLE', value);
      localStorage.setItem('notificationTitle', value);
    },
    setNotificationBody({commit}, value) {
      commit('SET_NOTIFICATION_BODY', value);
      localStorage.setItem('notificationBody', value);
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
    },
    getPomodorosGoal(state) {
      return state.pomodorosGoal
    },
    getPomodoros(state) {
      return state.pomodoros
    },
    getTimerTitle(state) {
      return state.timerTitle
    },
    getGoalIndicatorFormat(state) {
      return state.goalIndicatorFormat
    },
    getProgressBar(state) {
      return state.reversedProgressBar
    },
    getNotificationTitle(state) {
      return state.notificationTitle
    },
    getNotificationBody(state) {
      return state.notificationBody
    }
  }
})
