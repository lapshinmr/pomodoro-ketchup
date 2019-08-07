import Vue from 'vue'
import Vuex from 'vuex'
import * as cons from '@/constants';


Vue.use(Vuex);


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
    pomodorosTotal: 0,
    pomodorosGoal: 0,
    goalIndicatorFormat: 0,
    isTimerTitle: true,
    isReversedProgressBar: false,
    notificationTitle: '',
    notificationBody: '',
    colorTheme: null
  },
  getters: {
    CUR_TIME_FORMATTED(state) {
      let minutes = Math.floor(state.curTime / 60);
      let seconds = Math.floor(state.curTime - minutes * 60);
      let isMinutesZero = minutes < 10 ? '0' : '';
      let isSecondsZero = seconds < 10 ? '0' : '';
      return `${isMinutesZero}${minutes}:${isSecondsZero}${seconds}`
    }
  },
  mutations: {
    SET_INIT_TIME(state, payload) {
      state.initTime = payload
    },
    SET_TIME(state, payload) {
      state.curTime = payload;
    },
    SET_END_TIME(state) {
      state.endTime = Date.now() + state.curTime * cons.REFRESH_TIME;
    },
    DECREASE_TIME(state) {
      state.curTime -= cons.REFRESH_TIME / 1000
    },
    SET_TIMER_ID(state, payload) {
      state.timerId = payload
    },
    SET_POMODOROS_TOTAL(state, payload) {
      state.pomodorosTotal = payload;
    },
    ADD_POMODORO(state) {
      state.pomodorosTotal += 1
    },
    REMOVE_POMODORO(state) {
      if (state.pomodorosTotal > 0) {
        state.pomodorosTotal -= 1
      }
    },
    SET_POMODOROS_GOAL(state, payload) {
      state.pomodorosGoal = payload
    },
    SET_GOAL_INDICATOR_FORMAT(state, payload) {
      state.goalIndicatorFormat = payload
    },
    SET_PROGRESS_BAR_FLAG(state, payload) {
      state.isReversedProgressBar = payload
    },
    SWITCH_PROGRESS_BAR_FLAG(state) {
      state.isReversedProgressBar = !state.isReversedProgressBar
    },
    SET_TIMER_TITLE_FLAG(state, payload) {
      state.isTimerTitle = payload
    },
    SWITCH_TIMER_TITLE_FLAG(state) {
      state.isTimerTitle = !state.isTimerTitle
    },
    SET_NOTIFICATION_TITLE(state, payload) {
      state.notificationTitle = payload
    },
    SET_NOTIFICATION_BODY(state, payload) {
      state.notificationBody = payload
    },
    SET_COLOR_THEME(state, payload) {
      state.colorTheme = payload
    }
  },
  actions: {
    loadVars({commit, dispatch}) {
      let initTime = get('initTime', true) || cons.POMODORO_DEFAULT;
      let isTimerTitle = get('isTimerTitle', true) || true;
      let pomodorosTotal = get('pomodorosTotal', true) || 0;
      let goalIndicatorFormat = get('goalIndicatorFormat', true) || cons.GOAL_INDICATOR_FORMAT_DEFAULT;
      let isReversedProgressBar = get('isReversedProgressBar', true) || false;
      let notificationTitle = get('notificationTitle') || cons.NOTIFICATION_TITLE_DEFAULT;
      let notificationBody = get('notificationBody') || cons.NOTIFICATION_BODY_DEFAULT;
      let endTime = get('endTime') || Date.now();
      let colorTheme = get('colorTheme') || cons.COLOR_THEME_DEFAULT;
      commit('SET_INIT_TIME', initTime);
      commit('SET_TIMER_TITLE_FLAG', isTimerTitle);
      commit('SET_POMODOROS_TOTAL', pomodorosTotal);
      commit('SET_GOAL_INDICATOR_FORMAT', goalIndicatorFormat);
      commit('SET_PROGRESS_BAR_FLAG', isReversedProgressBar);
      commit('SET_NOTIFICATION_TITLE', notificationTitle);
      commit('SET_NOTIFICATION_BODY', notificationBody);
      commit('SET_COLOR_THEME', colorTheme);
      let curTime = Math.floor((endTime - Date.now()) / 1000);
      if ( curTime > 0 ) {
        commit('SET_TIME', curTime);
        dispatch('runTimer')
      }
    },
    setInitTime({commit}, payload) {
      commit('SET_INIT_TIME', payload);
      localStorage.setItem('initTime', payload);
    },
    setTime({commit, state}, payload) {
      if (!payload) {
        payload = state.initTime
      }
      commit('SET_TIME', payload)
    },
    setPomodorosGoal({commit}, payload) {
      let pomodorosGoal;
      if (!payload) {
        pomodorosGoal = get('pomodorosGoal', true) || cons.POMODOROS_GOAL_DEFAULT;
      } else {
        pomodorosGoal = payload;
        localStorage.setItem('pomodorosGoal', payload)
      }
      commit('SET_POMODOROS_GOAL', pomodorosGoal);
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
          commit('SET_TIMER_ID', null);
          dispatch('addPomodoro');
          if (Notification.permission === 'granted') {
            new Notification(state.notificationTitle, {
              body: state.notificationBody
            });
          }
        } else {
          commit('DECREASE_TIME')
        }
      }, cons.REFRESH_TIME);
      commit('SET_TIMER_ID', timerId)
    },
    pauseTimer({commit, state}) {
      clearInterval(state.timerId);
      commit('SET_TIMER_ID', null)
    },
    resetTimer({commit, state, dispatch}) {
      clearInterval(state.timerId);
      commit('SET_TIMER_ID', null);
      dispatch('setTime')
    },
    setPomodorosTotal({commit, state}, payload) {
      commit('SET_POMODOROS_TOTAL', payload);
      localStorage.setItem('pomodorosTotal', state.pomodorosTotal)
    },
    addPomodoro({commit, state}) {
      commit('ADD_POMODORO');
      localStorage.setItem('pomodorosTotal', state.pomodorosTotal)
    },
    removePomodoro({commit, state}) {
      commit('REMOVE_POMODORO');
      localStorage.setItem('pomodorosTotal', state.pomodorosTotal)
    },
    switchTimerTitleFlag({commit, state}) {
      commit('SWITCH_TIMER_TITLE_FLAG');
      localStorage.setItem('isTimerTitle', state.isTimerTitle)
    },
    setGoalIndicatorFormat({commit}, value) {
      commit('SET_GOAL_INDICATOR_FORMAT', value);
      localStorage.setItem('goalIndicatorFormat', value)
    },
    switchProgressBarFlag({commit, state}) {
      commit('SWITCH_PROGRESS_BAR_FLAG');
      localStorage.setItem('isReversedProgressBar', state.isReversedProgressBar)
    },
    setNotificationTitle({commit}, value) {
      commit('SET_NOTIFICATION_TITLE', value);
      localStorage.setItem('notificationTitle', value);
    },
    setNotificationBody({commit}, value) {
      commit('SET_NOTIFICATION_BODY', value);
      localStorage.setItem('notificationBody', value);
    },
    setColorTheme({commit}, payload) {
      commit('SET_COLOR_THEME', payload);
      localStorage.setItem('colorTheme', payload);
    }
  }
})
