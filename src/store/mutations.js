import Vue from 'vue';

export default {
  SET_TIME_INIT(state, payload) {
    state.timeInit = payload;
  },
  SET_LEFT_TIME(state, payload) {
    state.timeLeft = payload;
  },
  SET_END_TIME(state) {
    state.timeEnd = Date.now() + state.timeLeft * 1000;
  },
  SET_TIME_EXTRA(state, payload) {
    state.timeExtra = payload;
  },
  DECREASE_TIME(state) {
    state.timeLeft = parseInt((state.timeEnd - new Date()) / 1000, 10);
  },
  INCREASE_EXTRA_TIME(state) {
    state.timeExtra = parseInt((new Date() - state.timeEnd) / 1000, 10);
  },
  SET_TIMER_ID(state, payload) {
    state.timerId = payload;
  },
  SET_TIMER_EXTRA_ID(state, payload) {
    state.timerExtraId = payload;
  },
  SET_PAUSE(state, payload) {
    state.isPause = payload;
  },
  SET_POMODOROS_TOTAL(state, payload) {
    state.pomodorosTotal = payload;
  },
  ADD_POMODORO(state) {
    state.pomodorosTotal += 1;
  },
  ADD_POMODOROS(state, pomodorosAmount) {
    state.pomodorosTotal += pomodorosAmount;
  },
  REMOVE_POMODORO(state) {
    if (state.pomodorosTotal > 0) {
      state.pomodorosTotal -= 1;
    }
  },
  SET_POMODOROS_GOAL(state, payload) {
    state.pomodorosGoal = payload;
  },
  SET_GOAL_INDICATOR_FORMAT(state, payload) {
    state.goalIndicatorFormat = payload;
  },
  SET_PROGRESS_BAR_FLAG(state, payload) {
    state.isReversedProgressBar = payload;
  },
  SWITCH_PROGRESS_BAR_FLAG(state) {
    state.isReversedProgressBar = !state.isReversedProgressBar;
  },
  SET_TIMER_TITLE_FLAG(state, payload) {
    state.isTimerTitle = payload;
  },
  SWITCH_TIMER_TITLE_FLAG(state) {
    state.isTimerTitle = !state.isTimerTitle;
  },
  SET_NOTIFICATION_TITLE(state, payload) {
    state.notificationTitle = payload;
  },
  SET_NOTIFICATION_BODY(state, payload) {
    state.notificationBody = payload;
  },
  SET_NOTIFICATION_SOUND(state, payload) {
    state.notificationSound = payload;
  },
  SET_COLOR_THEME(state, payload) {
    state.colorTheme = payload;
  },
  ADD_STATISTIC(state, { value, index }) {
    const now = new Date();
    const itemToAd = {
      value,
      note: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    };
    if (index !== undefined) {
      state.statistic.splice(index, 0, itemToAd);
    } else {
      state.statistic.push(itemToAd);
    }
  },
  EDIT_STATISTIC_ITEM(state, { index, value, note }) {
    Vue.set(state.statistic, index, {
      value: value ?? state.statistic[index].value,
      note: note ?? state.statistic[index].note,
    });
  },
  REMOVE_STATISTIC(state, payload) {
    state.statistic.splice(payload, 1);
  },
  SET_SYNC_ID(state, payload) {
    state.syncId = payload;
  },
};
