// eslint-disable-next-line import/prefer-default-export
export function secondsToTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  const isMinutesZero = minutes < 10 ? '0' : '';
  const isSecondsZero = seconds < 10 ? '0' : '';

  return `${isMinutesZero}${minutes}:${isSecondsZero}${seconds}`;
}
