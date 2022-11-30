import * as cons from '@/helpers/const/constants';
import { secondsToTime } from '@/helpers/funcs/time';

export default {
  CUR_TIME_FORMATTED(state) {
    return secondsToTime(state.timeLeft);
  },
  COLORS(state) {
    const colors = cons.COLOR_THEMES[state.colorTheme];
    return {
      '--super-light': colors.superLight,
      '--light': colors.light,
      '--primary': colors.primary,
      '--dark': colors.dark,
      '--super-dark': colors.superDark,
    };
  },
};
