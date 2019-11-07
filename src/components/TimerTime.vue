<template>
  <div class="timer">
    <div class="timer__slot">
      <slot></slot>
    </div>
    <div class="timer__time d-flex justify-content-center align-items-center">
      <span v-if="!isSettingsMode"
          class="timer__string"
          contenteditable="false"
      >{{ timeLeft | seconds-to-time }}</span>
      <span v-if="isSettingsMode"
          class="timer__string"
          contenteditable="true"
          v-set-time=""
      >{{ timeInit | seconds-to-time }}</span>
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
  created() {
    console.log(this.isSettingsMode)
  },
  computed: {
    ...mapState([
      'isPause',
      'timeLeft',
      'timeInit'
    ]),
    ...mapGetters([
      'CUR_TIME_FORMATTED'
    ]),
    initTime: {
      get() {
        return secondsToTime(this.$store.state.timeInit)
      },
      set(initTimeString) {
        let initTimeSeconds = stringToTimeSeconds(initTimeString);
        if (!initTimeSeconds) { // if bad user input
          //this.$forceUpdate()
          console.log('+')
          this.setInitTime(this.$store.state.timeInit)
        } else {
          if (this.$store.state.timeInit === this.$store.state.timeLeft) {
            this.setLeftTime(initTimeSeconds)
          }
          this.setInitTime(initTimeSeconds)
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'startTimer',
      'pauseTimer',
      'resetTimer',
      'setLeftTime',
      'setInitTime'
    ])
  },
  directives: {
    'set-time': {
      bind(el, binding, vnode) {
        el.onblur = () => {
          vnode.context.initTime = el.innerText
        };
        el.onkeydown = function(event) {
          if (event.keyCode === 13) {
            event.preventDefault()
            el.blur()
          }
        }
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
    color: var(--dark)
    line-height: 1em
    font-size: 30%
    width: 100%

  .timer__string

  .timer__input
    width: auto
    display: inline-block
    padding: 0px
    color: var(--dark)
    text-align: center
    background-color: transparent
    border: none
    outline: none

  .timer__buttons
    display: flex
    justify-content: center
    position: absolute
    top: 100%
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
