<template>
  <div class="timer">
    <div class="timer__slot">
      <slot></slot>
    </div>
    <div class="timer__time d-flex justify-content-center align-items-center">
      <span v-if="!isSettingsMode"
          class="timer__string noselect"
          contenteditable="false"
          key="1"
      >{{ timeLeft | seconds-to-time }}</span>
      <span v-if="isSettingsMode"
          class="timer__string"
          :class="{'timer__string_editable': isSettingsMode}"
          contenteditable="true"
          v-set-editable="handleInitTime"
          key="2"
      >{{ timeInit | seconds-to-time }}</span>
      <transition name="line">
        <div class="timer__line" v-if="isSettingsMode"></div>
      </transition>
      <transition name="fade">
        <span v-if="isSettingsMode" class="timer__small noselect">
          {{ timeLeft | seconds-to-time }}
        </span>
      </transition>
    </div>
    <div class="timer__buttons">
      <button
        v-if="isPause"
        class="timer__button btn btn-success"
        @click="startTimer(playFromButton=true)"
        key="play"
      >
        <i class="fas fa-play"></i>
      </button>
      <button
        v-if="!isPause"
        class="timer__button btn btn-success"
        @click="pauseTimer"
        key="pause"
      >
        <i class="fas fa-pause"></i>
      </button>
      <button
        class="timer__button btn btn-success ml-2"
        @click="resetTimer"
        key="stop"
      >
        <i class="fas fa-stop"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { secondsToTime } from '../store'

const stringToTimeSeconds = function (value) {
  value = value.replace(':', '')
  if (!parseInt(value)) {
    return false
  }
  let length = value.length
  if (length < 1 || length > 4) {
    return false
  }
  let digitLimits = [9, 9, 5, 9]
  let digitsCheck = value.split('').every(function (value, index) {
    return value <= digitLimits[4 - length + index]
  })
  if (!digitsCheck) {
    return false
  } else {
    let seconds = value.slice(-2)
    let minutes = value.slice(0, length - 2)
    return Number(minutes) * 60 + Number(seconds)
  }
}

export default {
  name: 'timer-time',
  props: [ 'isSettingsMode' ],
  computed: {
    ...mapState([
      'isPause',
      'timeLeft',
      'timeInit'
    ])
  },
  methods: {
    ...mapActions([
      'startTimer',
      'pauseTimer',
      'resetTimer',
      'setLeftTime',
      'setInitTime'
    ]),
    handleInitTime(el) {
      let initTimeSeconds = stringToTimeSeconds(el.innerText);
      if (!initTimeSeconds) {
        el.innerText = secondsToTime(this.timeInit)
      } else {
        if (this.timeInit === this.timeLeft) {
          this.setLeftTime(initTimeSeconds)
        }
        this.setInitTime(initTimeSeconds)
        el.innerText = secondsToTime(initTimeSeconds)
      }
    }
  }
}
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

    .timer__button
      font-size: 4%
      border-radius: 50%
      display: flex
      align-items: center
      justify-content: center
      padding: 1rem



</style>
