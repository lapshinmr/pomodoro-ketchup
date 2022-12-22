import * as cons from '@/helpers/const/constants';
import { showNotification, playSound } from '@/helpers/funcs/notification';

export default {
  setLeftTime({ commit }, payload) {
    commit('SET_LEFT_TIME', payload);
  },
  createTimerInterval({ commit, dispatch, state }) {
    const timerId = setInterval(() => {
      if (state.timeLeft <= 0) {
        commit('SET_LEFT_TIME', 0);
        dispatch('pauseTimer');
        commit('ADD_POMODORO');
        showNotification(state.notificationTitle, state.notificationBody);
        playSound(state.notificationSound);
        dispatch('createExtraTimerInterval');
      } else {
        commit('DECREASE_TIME');
      }
    }, cons.REFRESH_TIME);
    if (state.timerId !== timerId) {
      commit('SET_TIMER_ID', timerId);
    }
  },
  createExtraTimerInterval({ state, commit }) {
    const timerExtraId = setInterval(() => {
      commit('INCREASE_EXTRA_TIME');
    }, cons.REFRESH_TIME);
    if (state.timerExtraId !== timerExtraId) {
      commit('SET_TIMER_EXTRA_ID', timerExtraId);
    }
  },
  startTimer({ commit, dispatch, state }, playFromButton = false) {
    let canStart = false;
    // Start timer from play button
    if (playFromButton) {
      if (state.timeLeft <= 0) {
        commit('SET_LEFT_TIME', state.timeInit);
      }
      canStart = true;
    // Start timer after page refresh
    } else if (!playFromButton && !state.isPause && state.timerId !== null) {
      const timeLeft = Math.floor((state.timeEnd - Date.now()) / 1000);
      state.timeLeft = timeLeft >= 0 ? timeLeft : 0;
      canStart = true;
    }
    if (canStart) {
      commit('SET_PAUSE', false);
      commit('SET_END_TIME');
      dispatch('createTimerInterval');
    }
  },
  startTimerExtra({ dispatch, state }) {
    if (state.isPause && state.timerExtraId !== null) {
      dispatch('createExtraTimerInterval');
    }
  },
  pauseTimer({ commit, state }) {
    if (state.timerId !== null) {
      clearInterval(state.timerId);
      commit('SET_TIMER_ID', null);
      commit('SET_PAUSE', true);
    }
  },
  resetTimer({ commit, state }) {
    clearInterval(state.timerId);
    commit('SET_LEFT_TIME', state.timeInit);
    commit('SET_TIMER_ID', null);
    commit('SET_PAUSE', true);
  },
  resetTimerExtra({ state, commit }) {
    clearInterval(state.timerExtraId);
    commit('SET_TIME_EXTRA', 0);
    commit('SET_TIMER_EXTRA_ID', null);
  },
  useTimeExtra({ state, commit, dispatch }) {
    const pomodoros = Math.floor(state.timeExtra / state.timeInit);
    if (pomodoros > 0) {
      commit('ADD_POMODOROS', pomodoros);
    }
    const timeExtra = state.timeExtra % state.timeInit;
    commit('SET_LEFT_TIME', state.timeInit - timeExtra);
    dispatch('resetTimerExtra');
  },
  switchTimerTitleFlag({ commit }) {
    commit('SWITCH_TIMER_TITLE_FLAG');
  },
  setGoalIndicatorFormat({ commit }, payload) {
    commit('SET_GOAL_INDICATOR_FORMAT', payload);
  },
  switchProgressBarFlag({ commit }) {
    commit('SWITCH_PROGRESS_BAR_FLAG');
  },
  setNotificationTitle({ commit }, payload) {
    commit('SET_NOTIFICATION_TITLE', payload);
  },
  setNotificationBody({ commit }, payload) {
    commit('SET_NOTIFICATION_BODY', payload);
  },
  setColorTheme({ commit }, payload) {
    commit('SET_COLOR_THEME', payload);
  },
  setNotificationSound({ commit }, payload) {
    commit('SET_NOTIFICATION_SOUND', payload);
  },
};
