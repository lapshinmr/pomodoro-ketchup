<template>
  <div class="timer">
    <div class="timer__slot">
      <slot />
    </div>
    <div class="timer__time d-flex justify-content-center align-items-center">
      <span
        v-if="!isSettingsMode"
        key="1"
        class="timer__string noselect"
        contenteditable="false"
      >{{ timeLeft | seconds-to-time }}</span>
      <span
        v-if="isSettingsMode"
        key="2"
        v-set-editable="handleInitTime"
        class="timer__string"
        :class="{'timer__string_editable': isSettingsMode}"
        contenteditable="true"
      >{{ timeInit | seconds-to-time }}</span>
      <transition name="line">
        <div
          v-if="isSettingsMode"
          class="timer__line"
        />
      </transition>
      <transition name="fade">
        <span
          v-if="isSettingsMode"
          class="timer__small noselect"
        >
          {{ timeLeft | seconds-to-time }}
        </span>
      </transition>
    </div>
    <div class="timer__buttons">
      <button
        v-if="isPause"
        key="play"
        class="btn-round btn-large"
        @click="startTimer(playFromButton=true)"
      >
        <i class="fas fa-play" />
      </button>
      <button
        v-if="!isPause"
        key="pause"
        class="btn-round btn-large"
        @click="pauseTimer"
      >
        <i class="fas fa-pause" />
      </button>
      <button
        key="stop"
        class="btn-round btn-large ml-2"
        @click="resetTimer"
      >
        <i class="fas fa-stop" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { secondsToTime } from '@/helpers/funcs/time';

const stringToTimeSeconds = (value) => {
  const timeString = value.replace(':', '');
  if (!+timeString) {
    return false;
  }
  const { length } = timeString;
  if (length < 1 || length > 4) {
    return false;
  }
  const digitLimits = [9, 9, 5, 9];
  const digitsCheck = timeString.split('').every((digit, index) => digit <= digitLimits[4 - length + index]);
  if (!digitsCheck) {
    return false;
  }
  const seconds = timeString.slice(-2);
  const minutes = timeString.slice(0, length - 2);
  return Number(minutes) * 60 + Number(seconds);
};

export default {
  name: 'TimerTime',
  props: ['isSettingsMode'],
  computed: {
    ...mapState([
      'isPause',
      'timeLeft',
      'timeInit',
    ]),
  },
  methods: {
    ...mapActions([
      'startTimer',
      'pauseTimer',
      'resetTimer',
      'setLeftTime',
      'setInitTime',
    ]),
    handleInitTime(el) {
      const initTimeSeconds = stringToTimeSeconds(el.innerText);
      if (!initTimeSeconds) {
        el.innerText = secondsToTime(this.timeInit);
      } else {
        if (this.timeInit === this.timeLeft) {
          this.setLeftTime(initTimeSeconds);
        }
        this.setInitTime(initTimeSeconds);
        el.innerText = secondsToTime(initTimeSeconds);
      }
    },
  },
};
</script>

<style scoped lang="sass">
.timer
  .timer__slot
    position: absolute
    bottom: 100%
    width: 100%

  .timer__time
    position: relative
    color: var(--dark)
    line-height: 1em
    font-size: 30%
    width: 100%

  .timer__string
    width: 100%

  .timer__string_editable
    outline: none

  .timer__line
    position: absolute
    bottom: 3%
    left: 0
    width: 100%
    height: 5px
    background-color: var(--dark)

  .timer__small
    position: absolute
    top: 100%
    right: 0
    font-size: 25%
    line-height: 1

  .timer__buttons
    display: flex
    justify-content: center
    position: absolute
    top: 115%
    left: 50%
    transform: translateX(-50%)
    width: 70%

</style>
