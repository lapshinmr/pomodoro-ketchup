import * as cons from '@/helpers/const/constants';

export default () => ({
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
  colorTheme: cons.COLOR_THEME_DEFAULT,
  statistic: [],
  syncId: null,
  isSettingsMode: false,
});
