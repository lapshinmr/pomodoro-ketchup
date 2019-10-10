import Vue from 'vue';
import Vuex from 'vuex';
import * as cons from '@/constants';

Vue.use(Vuex)

export function secondsToTime (value) {
  let minutes = Math.floor(value / 60)
  let seconds = value % 60
  let isMinutesZero = minutes < 10 ? '0' : ''
  let isSecondsZero = seconds < 10 ? '0' : ''
  return `${isMinutesZero}${minutes}:${isSecondsZero}${seconds}`
}

export function playNotification (state) {
  if (Notification.permission === 'granted') {
    new Notification(state.notificationTitle, {
      body: state.notificationBody
    })
    var audio = new Audio(require('@/assets/' + state.notificationSound))
    audio.volume = state.notificationVolume / 100
    audio.play()
  }
}

const loadState = function () {
  let stateData = JSON.parse(localStorage.getItem('data'));
  if (!stateData) {
    stateData = {
      timeInit: cons.POMODORO_DEFAULT,
      timeLeft: cons.POMODORO_DEFAULT,
      timeEnd: Date.now(),
      isPause: true,
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
    localStorage.setItem('data', JSON.stringify(stateData))
  }
  return stateData
}

const updateLocalStorage = store => {
  store.subscribe((mutation, state) => {
    if (mutation.type !== 'DECREASE_TIME') {
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
    setInitTime ({ commit }, payload) {
      commit('SET_INIT_TIME', payload)
    },
    setTime ({ commit, state }, payload) {
      commit('SET_LEFT_TIME', payload)
    },
    setPomodorosGoal ({ commit }, payload) {
      commit('SET_POMODOROS_GOAL', payload)
    },
    runTimer({ commit, dispatch, state}) {
      let timerId = setInterval(() => {
        if (state.timeLeft <= 0 && state.timerId) {
          clearInterval(state.timerId)
          commit('SET_LEFT_TIME', 0)
          commit('SET_TIMER_ID', null)
          dispatch('addPomodoro')
          playNotification(state);
        } else {
          if (state.timeLeft > 0 && !state.timerId) {
            commit('SET_TIMER_ID', timerId)
          }
          commit('DECREASE_TIME')
        }
      }, cons.REFRESH_TIME)
    },
    startTimer ({ commit, dispatch, state }, playFromButton=false) {
      // Timer can be run on button click and page reload
      let canStart;
      switch (true) {
        case !playFromButton && state.isPause:
          canStart = false;
          break
        case playFromButton && state.timerId !== null:
          canStart = false;
          break
        case !playFromButton && !state.isPause && state.timerId !== null:
          let timeLeft = Math.floor((state.timeEnd - Date.now()) / 1000);
          state.timeLeft = timeLeft >= 0 ? timeLeft : 0
          break;
        case playFromButton && state.timeLeft === 0:
          dispatch('setTime', state.timeInit)
          break;
        default:
          canStart = true;
      }
      commit('SET_PAUSE', false)
      commit('SET_END_TIME')
      if (canStart) {
        dispatch('runTimer')
      }
    },
    pauseTimer ({ commit, state }) {
      clearInterval(state.timerId)
      commit('SET_TIMER_ID', null)
      commit('SET_PAUSE', true)
    },
    resetTimer ({ commit, state, dispatch }) {
      clearInterval(state.timerId)
      dispatch('setTime', state.timeInit)
      commit('SET_TIMER_ID', null)
      commit('SET_PAUSE', true)
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
