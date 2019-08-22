import Vue from 'vue'
import Vuex from 'vuex'
import * as cons from '@/constants';
import { COLOR_THEMES, NOTIFICATION_SOUNDS } from "@/constants";


Vue.use(Vuex);


function save(key, data) {
  localStorage.setItem(key, data)
}


function load(key, parse=false) {
  if (parse) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return localStorage.getItem(key);
  }
}


function remove(key) {
  localStorage.removeItem(key)
}



export function secondsToTime(value) {
  let minutes = Math.floor(value / 60);
  let seconds = value % 60;
  let isMinutesZero = minutes < 10 ? '0' : '';
  let isSecondsZero = seconds < 10 ? '0' : '';
  return `${isMinutesZero}${minutes}:${isSecondsZero}${seconds}`
}


export default new Vuex.Store({
  state: {
    initTime: 0,
    curTime: 0,
    endTime: null,
    timerId: null,
    isPause: false,
    pomodorosTotal: 0,
    pomodorosGoal: 0,
    goalIndicatorFormat: 0,
    isTimerTitle: true,
    isReversedProgressBar: false,
    notificationTitle: '',
    notificationBody: '',
    notificationSound: '',
    notificationSounds: NOTIFICATION_SOUNDS,
    notificationVolume: 0,
    colorTheme: '',
    colorThemes: COLOR_THEMES
  },
  getters: {
    CUR_TIME_FORMATTED(state) {
      return secondsToTime(state.curTime)
    },
    COLORS(state) {
      let colors = state.colorThemes[state.colorTheme];
      return {
        '--super-light': colors.superLight,
        '--light': colors.light,
        '--primary': colors.primary,
        '--dark': colors.dark,
        '--super-dark': colors.superDark
      }
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
    SET_PAUSE(state, payload) {
      state.isPause = payload
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
    SET_NOTIFICATION_SOUND(state, payload) {
      state.notificationSound = payload
    },
    SET_NOTIFICATION_VOLUME(state, payload) {
      state.notificationVolume = payload
    },
    SET_COLOR_THEME(state, payload) {
      state.colorTheme = payload
    }
  },
  actions: {
    loadVars({commit, state, dispatch}) {
      let initTime = load('initTime', true) || cons.POMODORO_DEFAULT;
      let endTime = load('endTime') || Date.now();
      let isPause = load('isPause', true) || false;
      let isTimerTitle = load('isTimerTitle', true) || true;
      let pomodorosTotal = load('pomodorosTotal', true) || 0;
      let pomodorosGoal = load('pomodorosGoal', true) || cons.POMODOROS_GOAL_DEFAULT;
      let goalIndicatorFormat = load('goalIndicatorFormat', true) || cons.GOAL_INDICATOR_FORMAT_DEFAULT;
      let isReversedProgressBar = load('isReversedProgressBar', true) || false;
      let notificationTitle = load('notificationTitle') || cons.NOTIFICATION_TITLE_DEFAULT;
      let notificationBody = load('notificationBody') || cons.NOTIFICATION_BODY_DEFAULT;
      let notificationSound = load('notificationSound') || cons.NOTIFICATION_SOUND_DEFAULT;
      let notificationVolume = load('notificationVolume') || cons.NOTIFICATION_VOLUME_DEFAULT;
      let colorTheme = load('colorTheme') || cons.COLOR_THEME_DEFAULT;
      commit('SET_INIT_TIME', initTime);
      commit('SET_TIMER_TITLE_FLAG', isTimerTitle);
      commit('SET_POMODOROS_TOTAL', pomodorosTotal);
      commit('SET_POMODOROS_GOAL', pomodorosGoal);
      commit('SET_GOAL_INDICATOR_FORMAT', goalIndicatorFormat);
      commit('SET_PROGRESS_BAR_FLAG', isReversedProgressBar);
      commit('SET_NOTIFICATION_TITLE', notificationTitle);
      commit('SET_NOTIFICATION_BODY', notificationBody);
      commit('SET_NOTIFICATION_SOUND', notificationSound);
      commit('SET_NOTIFICATION_VOLUME', notificationVolume);
      commit('SET_COLOR_THEME', colorTheme);
      let curTime;
      if (isPause) {
        curTime = load('curTime') || 0;
      } else {
        curTime = Math.floor((endTime - Date.now()) / 1000);
      }
      console.log(curTime, isPause)
      if ( curTime > 0 && curTime < state.initTime) {
        commit('SET_TIME', curTime);
        if (!isPause) {
          dispatch('runTimer')
        }
      } else {
        commit('SET_TIME', initTime)
      }
    },
    setInitTime({commit}, payload) {
      commit('SET_INIT_TIME', payload);
      save('initTime', payload);
    },
    setTime({commit, state}, payload) {
      commit('SET_TIME', payload);
    },
    setPomodorosGoal({commit}, payload) {
      commit('SET_POMODOROS_GOAL', payload);
      save('pomodorosGoal', payload);
    },
    saveEndTime({commit, state}) {
      commit('SET_END_TIME');
      save('endTime', state.endTime)
    },
    runTimer({commit, dispatch, state}) {
      if (state.timerId) {
        return
      } else if (!state.timeId && state.curTime === 0) {
        dispatch('setTime', state.initTime)
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
            var audio = new Audio(require('@/assets/' + state.notificationSound));
            audio.volume = state.notificationVolume / 100;
            audio.play();
          }
        } else {
          commit('DECREASE_TIME');
          if (state.isPause) {
            commit('SET_PAUSE', false);
            save('isPause', false);
            remove('curTime');
          }
        }
      }, cons.REFRESH_TIME);
      commit('SET_TIMER_ID', timerId)
    },
    pauseTimer({commit, state}) {
      clearInterval(state.timerId);
      commit('SET_TIMER_ID', null);
      commit('SET_PAUSE', true);
      save('isPause', true);
      save('curTime', state.curTime)
    },
    resetTimer({commit, state, dispatch}) {
      clearInterval(state.timerId);
      remove('endTime');
      commit('SET_TIMER_ID', null);
      dispatch('setTime', state.initTime);
      commit('SET_PAUSE', false);
      save('isPause', false);
      remove('curTime');
    },
    setPomodorosTotal({commit, state}, payload) {
      commit('SET_POMODOROS_TOTAL', payload);
      save('pomodorosTotal', state.pomodorosTotal)
    },
    addPomodoro({commit, state}) {
      commit('ADD_POMODORO');
      save('pomodorosTotal', state.pomodorosTotal)
    },
    removePomodoro({commit, state}) {
      commit('REMOVE_POMODORO');
      save('pomodorosTotal', state.pomodorosTotal)
    },
    switchTimerTitleFlag({commit, state}) {
      commit('SWITCH_TIMER_TITLE_FLAG');
      save('isTimerTitle', state.isTimerTitle)
    },
    setGoalIndicatorFormat({commit}, payload) {
      commit('SET_GOAL_INDICATOR_FORMAT', payload);
      save('goalIndicatorFormat', payload)
    },
    switchProgressBarFlag({commit, state}) {
      commit('SWITCH_PROGRESS_BAR_FLAG');
      save('isReversedProgressBar', state.isReversedProgressBar)
    },
    setNotificationTitle({commit}, payload) {
      commit('SET_NOTIFICATION_TITLE', payload);
      save('notificationTitle', payload);
    },
    setNotificationBody({commit}, payload) {
      commit('SET_NOTIFICATION_BODY', payload);
      save('notificationBody', payload);
    },
    setColorTheme({commit}, payload) {
      commit('SET_COLOR_THEME', payload);
      save('colorTheme', payload);
    },
    setNotificationSound({commit}, payload) {
      commit('SET_NOTIFICATION_SOUND', payload);
      save('notificationSound', payload);
    },
    setNotificationVolume({commit}, payload) {
      commit('SET_NOTIFICATION_VOLUME', payload);
      save('notificationVolume', payload);
    }
  }
})
