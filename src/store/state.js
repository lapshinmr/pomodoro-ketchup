import * as cons from '@/helpers/const/constants';

export default () => ({
  // TIMERS
  timerId: null,
  timerExtraId: null,
  // TIMES
  timeInit: cons.POMODORO_DEFAULT,
  timeLeft: cons.POMODORO_DEFAULT,
  timeEnd: Date.now(),
  timeExtra: 0,
  // POMODOROS
  pomodorosTotal: 0,
  // APP STATE
  isPause: true,
  isSettingsMode: false,
  // SETTINGS
  pomodorosGoal: cons.POMODOROS_GOAL_DEFAULT,
  goalIndicatorFormat: cons.GOAL_INDICATOR_FORMAT_DEFAULT,
  isTimerTitle: true,
  isReversedProgressBar: true,
  notificationTitle: cons.NOTIFICATION_TITLE_DEFAULT,
  notificationBody: cons.NOTIFICATION_BODY_DEFAULT,
  notificationSound: cons.NOTIFICATION_SOUND_DEFAULT,
  colorTheme: cons.COLOR_THEME_DEFAULT,
  // STATISTIC
  statistic: [],
  // SYNCHRONIZATION
  syncId: null,
});
