import * as cons from '@/helpers/const/constants';

export function playNotification(state) {
  if (Notification.permission === 'granted') {
    Notification(state.notificationTitle, {
      body: state.notificationBody,
    });
    // const soundPath = `@/assets/${state.notificationSound}`;
    const audio = new Audio(state.notificationSound);
    audio.play();
  }
}

export default {
  setInitTime({ commit }, payload) {
    commit('SET_INIT_TIME', payload);
  },
  setLeftTime({ commit }, payload) {
    commit('SET_LEFT_TIME', payload);
  },
  setPomodorosGoal({ commit }, payload) {
    commit('SET_POMODOROS_GOAL', payload);
  },
  createTimerInterval({ commit, dispatch, state }) {
    const timerId = setInterval(() => {
      if (state.timerId !== timerId) {
        commit('SET_TIMER_ID', timerId);
      }
      if (state.timeLeft <= 0) {
        commit('SET_LEFT_TIME', 0);
        dispatch('pauseTimer');
        dispatch('addPomodoro');
        playNotification(state);
      } else {
        commit('DECREASE_TIME');
      }
    }, cons.REFRESH_TIME);
  },
  startTimer({ commit, dispatch, state }, playFromButton = false) {
    // Timer can be run on button click and page reload
    let canStart = false;
    const timeLeft = Math.floor((state.timeEnd - Date.now()) / 1000);
    switch (true) {
      case !playFromButton && state.isPause:
        break;
      case playFromButton && state.timerId !== null:
        break;
      case !playFromButton && !state.isPause && state.timerId !== null:
        state.timeLeft = timeLeft >= 0 ? timeLeft : 0;
        canStart = true;
        break;
      case playFromButton:
        if (state.timeLeft === 0) {
          dispatch('setLeftTime', state.timeInit);
        }
        canStart = true;
        break;
      default:
        canStart = false;
    }
    if (canStart) {
      commit('SET_PAUSE', false);
      commit('SET_END_TIME');
      dispatch('createTimerInterval');
    }
  },
  pauseTimer({ commit, state }) {
    if (state.timerId !== null) {
      clearInterval(state.timerId);
      commit('SET_TIMER_ID', null);
      commit('SET_PAUSE', true);
    }
  },
  resetTimer({ commit, state, dispatch }) {
    clearInterval(state.timerId);
    dispatch('setLeftTime', state.timeInit);
    commit('SET_TIMER_ID', null);
    commit('SET_PAUSE', true);
  },
  setPomodorosTotal({ commit }, payload) {
    commit('SET_POMODOROS_TOTAL', payload);
  },
  addPomodoro({ commit }) {
    commit('ADD_POMODORO');
  },
  removePomodoro({ commit }) {
    commit('REMOVE_POMODORO');
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
  addStatistic({ commit }, payload) {
    commit('ADD_STATISTIC', payload);
  },
  editStatisticValue({ commit }, payload) {
    commit('EDIT_STATISTIC_VALUE', payload);
  },
  editStatisticNote({ commit }, payload) {
    commit('EDIT_STATISTIC_NOTE', payload);
  },
  removeStatistic({ commit }, payload) {
    commit('REMOVE_STATISTIC', payload);
  },
  setSyncId({ commit }, payload) {
    commit('SET_SYNC_ID', payload);
  },
};
