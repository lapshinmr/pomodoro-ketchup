import Vue from 'vue';
import Vuex from 'vuex';
import * as cons from '@/constants';

Vue.use(Vuex)


function save (key, data) {
  localStorage.setItem(key, data)
}

function load (key, defValue=null) {
  let value = localStorage.getItem(key);
  try {
    value = JSON.parse(value);
  } catch {}
  if ((defValue || defValue === 0 || defValue === false) && value === null) {
    value = defValue;
  }
  return value
}

export function secondsToTime (value) {
  let minutes = Math.floor(value / 60)
  let seconds = value % 60
  let isMinutesZero = minutes < 10 ? '0' : ''
  let isSecondsZero = seconds < 10 ? '0' : ''
  return `${isMinutesZero}${minutes}:${isSecondsZero}${seconds}`
}

const loadState = function () {
  const initState = {
    timeInit: cons.POMODORO_DEFAULT,
    timeLeft: cons.POMODORO_DEFAULT,
    timeEnd: Date.now(),
    isPause: false,
    pomodorosTotal: 0,
    pomodorosGoal: cons.POMODOROS_GOAL_DEFAULT,
    goalIndicatorFormat: cons.GOAL_INDICATOR_FORMAT_DEFAULT,
    isTimerTitle: true,
    isReversedProgressBar: true,
    notificationTitle: cons.NOTIFICATION_TITLE_DEFAULT,
    notificationBody: cons.NOTIFICATION_BODY_DEFAULT,
    notificationSound: cons.NOTIFICATION_SOUND_DEFAULT,
    notificationVolume: cons.NOTIFICATION_VOLUME_DEFAULT,
    colorTheme: cons.COLOR_THEME_DEFAULT
  }
  let data = JSON.parse(localStorage.getItem('data'));
  if (!data) {
    localStorage.setItem('data', JSON.stringify(initState))
  } else {
    let timeLeft
    if (data.isPause) {
      timeLeft = data.timeLeft
    } else {
      timeLeft = Math.floor((data.timeEnd - Date.now()) / 1000)
    }
    if (timeLeft > 0 && timeLeft != state.timeInit && !isPause) {
      dispatch('runTimer')
    }
  }
  return initState
}

const updateLocalStorage = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    console.log(mutation.type, mutation.payload)
    let ignore = [
      'DECREASE_TIME',
      'SET_TIMER_ID',
    ]
    if (ignore.indexOf(mutation.type) === -1) {
      console.log('CHANGE STATE')
      localStorage.setItem('data', JSON.stringify(state))
    }
  })
}

export default new Vuex.Store({
  plugins: [updateLocalStorage],
  state: {
    ...loadState(),
    timerId: null,
    isSettingsMode: false
  },
  getters: {
    CUR_TIME_FORMATTED (state) {
      return secondsToTime(state.timeLeft)
    },
    COLORS (state) {
      let colors = cons.COLOR_THEMES[state.colorTheme]
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
    SET_INIT_TIME (state, payload) {
      state.timeInit = payload
    },
    SET_LEFT_TIME (state, payload) {
      state.timeLeft = payload
    },
    SET_END_TIME (state) {
      state.timeEnd = Date.now() + state.timeLeft * cons.REFRESH_TIME
    },
    DECREASE_TIME (state) {
      state.timeLeft -= cons.REFRESH_TIME / 1000
    },
    SET_TIMER_ID (state, payload) {
      state.timerId = payload
    },
    SET_PAUSE (state, payload) {
      state.isPause = payload
    },
    SET_POMODOROS_TOTAL (state, payload) {
      state.pomodorosTotal = payload
    },
    ADD_POMODORO (state) {
      state.pomodorosTotal += 1
    },
    REMOVE_POMODORO (state) {
      if (state.pomodorosTotal > 0) {
        state.pomodorosTotal -= 1
      }
    },
    SET_POMODOROS_GOAL (state, payload) {
      state.pomodorosGoal = payload
    },
    SET_GOAL_INDICATOR_FORMAT (state, payload) {
      state.goalIndicatorFormat = payload
    },
    SET_PROGRESS_BAR_FLAG (state, payload) {
      state.isReversedProgressBar = payload
    },
    SWITCH_PROGRESS_BAR_FLAG (state) {
      state.isReversedProgressBar = !state.isReversedProgressBar
    },
    SET_TIMER_TITLE_FLAG (state, payload) {
      state.isTimerTitle = payload
    },
    SWITCH_TIMER_TITLE_FLAG (state) {
      state.isTimerTitle = !state.isTimerTitle
    },
    SET_NOTIFICATION_TITLE (state, payload) {
      state.notificationTitle = payload
    },
    SET_NOTIFICATION_BODY (state, payload) {
      state.notificationBody = payload
    },
    SET_NOTIFICATION_SOUND (state, payload) {
      state.notificationSound = payload
    },
    SET_NOTIFICATION_VOLUME (state, payload) {
      state.notificationVolume = payload
    },
    SET_COLOR_THEME (state, payload) {
      state.colorTheme = payload
    }
  },
  actions: {
    loadVars ({ commit, state, dispatch }) {
      //let timeInit = load('timeInit', cons.POMODORO_DEFAULT);
      //let timeEnd = load('timeEnd', Date.now());
      //let isPause = load('isPause', false);
      //let isTimerTitle = load('isTimerTitle', true);
      //let pomodorosTotal = load('pomodorosTotal', 0);
      //let pomodorosGoal = load('pomodorosGoal', cons.POMODOROS_GOAL_DEFAULT) ;
      //let goalIndicatorFormat = load('goalIndicatorFormat', cons.GOAL_INDICATOR_FORMAT_DEFAULT);
      //let isReversedProgressBar = load('isReversedProgressBar', true);
      //let notificationTitle = load('notificationTitle', cons.NOTIFICATION_TITLE_DEFAULT);
      //let notificationBody = load('notificationBody', cons.NOTIFICATION_BODY_DEFAULT);
      //let notificationSound = load('notificationSound', cons.NOTIFICATION_SOUND_DEFAULT);
      //let notificationVolume = load('notificationVolume', cons.NOTIFICATION_VOLUME_DEFAULT)
      //let colorTheme = load('colorTheme', cons.COLOR_THEME_DEFAULT)
      //commit('SET_INIT_TIME', timeInit)
      //commit('SET_TIMER_TITLE_FLAG', isTimerTitle)
      //commit('SET_POMODOROS_TOTAL', pomodorosTotal)
      //commit('SET_POMODOROS_GOAL', pomodorosGoal)
      //commit('SET_GOAL_INDICATOR_FORMAT', goalIndicatorFormat)
      //commit('SET_PROGRESS_BAR_FLAG', isReversedProgressBar)
      //commit('SET_NOTIFICATION_TITLE', notificationTitle)
      //commit('SET_NOTIFICATION_BODY', notificationBody)
      //commit('SET_NOTIFICATION_SOUND', notificationSound)
      //commit('SET_NOTIFICATION_VOLUME', notificationVolume)
      //commit('SET_COLOR_THEME', colorTheme)
    },
    setInitTime ({ commit }, payload) {
      commit('SET_INIT_TIME', payload)
    },
    setTime ({ commit, state }, payload) {
      commit('SET_LEFT_TIME', payload)
    },
    setPomodorosGoal ({ commit }, payload) {
      commit('SET_POMODOROS_GOAL', payload)
    },
    saveEndTime ({ commit, state }) {
      commit('SET_END_TIME')
    },
    runTimer ({ commit, dispatch, state }) {
      if (state.timerId) {
        return
      } else if (!state.timeId && state.timeLeft === 0) {
        dispatch('setTime', state.timeInit)
      }
      dispatch('saveEndTime')
      let timerId = setInterval(() => {
        if (state.timeEnd <= Date.now() && state.timerId) {
          clearInterval(state.timerId)
          commit('SET_LEFT_TIME', 0)
          commit('SET_TIMER_ID', null)
          dispatch('addPomodoro')
          if (Notification.permission === 'granted') {
            new Notification(state.notificationTitle, {
              body: state.notificationBody
            })
            var audio = new Audio(require('@/assets/' + state.notificationSound))
            audio.volume = state.notificationVolume / 100
            audio.play()
          }
        } else {
          commit('DECREASE_TIME')
          if (state.isPause) {
            commit('SET_PAUSE', false)
            save('isPause', false)
          }
        }
      }, cons.REFRESH_TIME)
      commit('SET_TIMER_ID', timerId)
    },
    pauseTimer ({ commit, state }) {
      clearInterval(state.timerId)
      commit('SET_TIMER_ID', null)
      commit('SET_PAUSE', true)
    },
    resetTimer ({ commit, state, dispatch }) {
      clearInterval(state.timerId)
      commit('SET_TIMER_ID', null)
      dispatch('setTime', state.timeInit)
      commit('SET_PAUSE', false)
    },
    setPomodorosTotal ({ commit, state }, payload) {
      commit('SET_POMODOROS_TOTAL', payload)
    },
    addPomodoro ({ commit, state }) {
      commit('ADD_POMODORO')
    },
    removePomodoro ({ commit, state }) {
      commit('REMOVE_POMODORO')
    },
    switchTimerTitleFlag ({ commit, state }) {
      commit('SWITCH_TIMER_TITLE_FLAG')
    },
    setGoalIndicatorFormat ({ commit }, payload) {
      commit('SET_GOAL_INDICATOR_FORMAT', payload)
    },
    switchProgressBarFlag ({ commit, state }) {
      commit('SWITCH_PROGRESS_BAR_FLAG')
    },
    setNotificationTitle ({ commit }, payload) {
      commit('SET_NOTIFICATION_TITLE', payload)
    },
    setNotificationBody ({ commit }, payload) {
      commit('SET_NOTIFICATION_BODY', payload)
    },
    setColorTheme ({ commit }, payload) {
      commit('SET_COLOR_THEME', payload)
    },
    setNotificationSound ({ commit }, payload) {
      commit('SET_NOTIFICATION_SOUND', payload)
    },
    setNotificationVolume ({ commit }, payload) {
      commit('SET_NOTIFICATION_VOLUME', payload)
    }
  }
})
